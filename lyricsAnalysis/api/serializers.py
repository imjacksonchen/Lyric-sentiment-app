from rest_framework import serializers
from lyricsAnalysis.models import Song, Album, Artist


class ArtistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ("id", "name", "picture", "description")


class SongSerializers(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ("id", "title", "lyrics",
                  "sentiment", "sentimentVal", "album")


class AlbumSerializers(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ("id", "name", "sentimentVal", "picture", "artist")