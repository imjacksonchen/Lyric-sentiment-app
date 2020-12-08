from django.test import TestCase
from .models import Artist, Song, Album

class ModelsTestCase(TestCase):
    def setUp(self):
        Artist.objects.create(name= "Drake")
        Artist.objects.create(name= "The Beatles")

    def test_artist_model(self):
        artist1 = Artist.objects.get(name="Drake")
        artist2 = Artist.objects.get(name="The Beatles")

        self.assertEqual(artist1.picture is not None, True)
        self.assertEqual(artist1.description is not None, True)

        self.assertEqual(artist2.picture is not None, True)
        self.assertEqual(artist2.description is not None, True)

        self.assertEqual(isinstance(artist1.picture, str), True)
        self.assertEqual(isinstance(artist1.description, str), True)

        self.assertEqual(isinstance(artist2.picture, str), True)
        self.assertEqual(isinstance(artist2.description, str), True)

    def test_album_model(self):
        album1 = Album.objects.get(name='Views')
        album2 = Album.objects.get(name='Hey Jude')

        self.assertEqual(album1.picture is not None, True)
        self.assertEqual(album1.sentimentVal is not None, True)
        self.assertEqual(album1.artist is not None, True)

        self.assertEqual(album2.picture is not None, True)
        self.assertEqual(album2.sentimentVal is not None, True)
        self.assertEqual(album2.artist is not None, True)

        self.assertEqual(isinstance(album1.picture, str), True)
        self.assertEqual(isinstance(album1.sentimentVal, float), True)

        self.assertEqual(isinstance(album2.picture, str), True)
        self.assertEqual(isinstance(album2.sentimentVal, float), True)

    def test_song_model(self):
        song1 = Song.objects.get(title='One Dance')
        song2 = Song.objects.get(title='Hey Jude')

        self.assertEqual(song1.lyrics is not None, True)
        self.assertEqual(song1.sentimentVal is not None, True)
        self.assertEqual(song1.sentiment is not None, True)
        self.assertEqual(song1.album is not None, True)

        self.assertEqual(song2.lyrics is not None, True)
        self.assertEqual(song2.sentimentVal is not None, True)
        self.assertEqual(song2.sentiment is not None, True)
        self.assertEqual(song2.album is not None, True)

        self.assertEqual(isinstance(song1.lyrics, str), True)
        self.assertEqual(isinstance(song1.sentimentVal, float), True)
        self.assertEqual(isinstance(song1.sentiment, str), True)

        self.assertEqual(isinstance(song2.lyrics, str), True)
        self.assertEqual(isinstance(song2.sentimentVal, float), True)
        self.assertEqual(isinstance(song2.sentiment, str), True)