from django.contrib.postgres.fields import ArrayField
from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=120)
    picture = models.URLField(default='', blank=True)
    description= models.TextField(default = '')

    # Define our own save function so that when a user enters an artist's name,
    # we would do all the information gathering, parsing, and calculating.
    def save(self, *args, **kwargs):
        import lyricsgenius
        import json
        import os

        # Set up API for Genius
        genius = lyricsgenius.Genius(
            "Insert your Genius API here")

        # Set parameters to exclude entries that don't match what we want.
        genius.excluded_terms = ["(Remix)", "(Live)"]
        genius.remove_section_headers = True
        genius.remove_non_songs = True

        artist_name = self.name

        artist_object = genius.search_artist(artist_name, max_songs=10)
        artist_name = artist_object.name
        genius.save_artists(artist_object, overwrite=True)

        with open('Lyrics_%s.json' % artist_name.replace(' ', '')) as f:
            data = json.load(f)

        description = data['description']['plain'].splitlines()

        self.name = data['name']
        self.picture = data['image_url']
        self.description = description[0]
        super().save(*args, **kwargs)

        for i in range(len(data['songs'])):
            if (not(data['songs'][i]['album'] == None)):
                if(not (Album.objects.filter(name=data['songs'][i]['album']['name']).exists())):
                    Album.objects.create(
                        artist=self,
                        name=data['songs'][i]['album']['name'],
                        sentimentVal=0.5,
                        picture=data['songs'][i]['album']['cover_art_url'])

        from textblob import TextBlob

        for i in range(len(data['songs'])):
            if (not(data['songs'][i]['album'] == None)):
                sentiment = TextBlob(data['songs'][i]['lyrics']).sentiment.polarity
                if sentiment > .75:
                    textSentiment = "Very positive"
                elif sentiment > .25:
                    textSentiment = "Positive"
                elif sentiment > .01:
                    textSentiment = "Slightly positive"
                elif sentiment > -.01:
                    textSentiment = "Neutral"
                elif sentiment > -.25:
                    textSentiment = "Slightly negative"
                elif sentiment > -.75:
                    textSentiment = "Negative"
                else:
                    textSentiment = "Very negative"

                Song.objects.create(
                    album=Album.objects.get(
                        name=data['songs'][i]['album']['name']),
                    title=data['songs'][i]['title'],
                    sentiment=textSentiment,
                    sentimentVal=sentiment,
                    lyrics=data['songs'][i]['lyrics'])

        artist_object_tmp = Artist.objects.get(name=data['name'])
        artistID = artist_object_tmp.id

        artist_objs = Album.objects.filter(artist=artistID)
        for i in range(len(artist_objs)):
            sentimentSum = 0
            song_objs = Song.objects.filter(album=artist_objs[i].id)
            for j in range(len(song_objs)):
                sentimentSum += song_objs[j].sentimentVal
            artist_objs[i].sentimentVal = sentimentSum/len(song_objs)
            artist_objs[i].save()
        
        # Delete json file
        os.remove('Lyrics_%s.json' % artist_name.replace(' ', '')) 

    def __str__(self):
        return self.name

    def test(self, name):
        import lyricsgenius
        import json

        # Set up API for Genius
        genius = lyricsgenius.Genius(
            "fW2_PmKBf9pFAoXwVfCsFZrqnxCI9XJFuAQHrxp5k2pzFQKzvSlnYfIrQWEe8q7a")

        tmp_artist_object = genius.search_artist(name, max_songs=0)
        artist_name = tmp_artist_object.name

        return(artist_name)


class Album(models.Model):
    name = models.CharField(max_length=120)
    sentimentVal = models.FloatField(default=9.9)
    picture = models.URLField(default='')
    artist = models.ForeignKey(Artist, default=1, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=120)
    lyrics = models.TextField()
    sentiment = models.CharField(default='', max_length=120)
    sentimentVal = models.FloatField(default=9.9)
    album = models.ForeignKey(Album, default=1, on_delete=models.CASCADE)

    def __str__(self):
        return self.title