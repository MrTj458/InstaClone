from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response


class TestViewSet(GenericViewSet):
    def list(self, request):
        return Response({'success': True})
