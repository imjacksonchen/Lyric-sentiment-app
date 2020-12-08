from lyricsAnalysis.models import Album, Artist, Song
from .serializers import SongSerializers, AlbumSerializers, ArtistSerializers
from rest_framework import viewsets, filters, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status


class ArtistViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ArtistSerializers
    queryset = Artist.objects.all()

    # We define our own create function to see if an artist's name has been
    # entered into our database
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']

            if name != '':
                test = Artist.test(self, name) # Get the artist name based on Genius' website
                artist_list = Artist.objects.filter(
                    name=test) 

                if not artist_list:
                    artist = serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    artist = artist_list[0]
                    tmp = Artist.objects.get(name=test)
                    return Response(data={'id': tmp.id,
                                          "name": tmp.name,
                                          "picture": tmp.picture},
                                    status=status.HTTP_200_OK)

            else:
                return Response(data={'message': 'Empty artist name'},
                                status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AlbumViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    queryset = Album.objects.all()
    serializer_class = AlbumSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['artist']


class SongViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = SongSerializers
    queryset = Song.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['album']