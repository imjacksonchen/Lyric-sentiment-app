from django.urls import path, include
from rest_framework.routers import DefaultRouter
from lyricsAnalysis.api.views import SongViewSet, AlbumViewSet, ArtistViewSet


router = DefaultRouter()
router.register(r'song', SongViewSet, basename='song')
router.register(r'album', AlbumViewSet, basename='album')
router.register(r'', ArtistViewSet, basename='artist')

urlpatterns = [
    path('', include(router.urls)),
]
