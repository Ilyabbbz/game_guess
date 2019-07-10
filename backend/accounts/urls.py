from django.urls import path, include, re_path
from django.contrib.auth import views as auth_views

app_name = 'accounts'

urlpatterns = [
    path('', auth_views.LoginView.as_view(), name='login'),
]
