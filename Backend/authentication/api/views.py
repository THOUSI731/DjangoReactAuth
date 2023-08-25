from ..models import Profile,User
from .serializers import UserSerializer,MyTokenObtainPairSerializer,RegisterSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

class MyTokenObtainPairView(TokenObtainPairView):
     serializer_class = MyTokenObtainPairSerializer
     
class RegisterView(generics.CreateAPIView):
     queryset = User.objects.all()
     permission_classes = ([AllowAny])
     serializer_class = RegisterSerializer
     
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
     if request.method == 'GET':
          response = f'Hey {request.user},You are in Dashboard'
          return Response({'response':response},status=status.HTTP_200_OK)
     elif request.method == 'POST':
          text = request.POST.get('text')
          response = f'Hey {request.user},Thank You For Submitting YouR tExt'
          return Response({'response' : response},status=status.HTTP_200_OK)
     return Response({},status=status.HTTP_400_BAD_REQUEST)
          