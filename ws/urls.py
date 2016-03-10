"""whiteshadoofs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""

from django.conf.urls import include, url
from django.contrib import admin
from ws import views
# from django.conf.urls.static import static
# from django.contrib.staticfiles.urls import staticfiles_urlpatterns

ws_patterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^objects_search', views.objects_search, name='objects_search'),
    url(r'^fetch_placemarks', views.fetch_placemarks, name='fetch_placemarks'),
    url(r'^get_fe_menu', views.GetFEMenuView.as_view(), name='get_fe_menu'),
    url(r'^register/$', views.RegisterFormView.as_view(), name='register'),
    url(r'^profile$', views.ProfileView.as_view(), name='profile'),
    url(r'^login/$', views.LoginFormView.as_view(), name='login'),
    url(r'^logout/$', views.LogoutView.as_view(), name='logout'),
    url(r'^add/$', views.AddObjectFormView.as_view(), name='add'),
    url(r'^add_address/$', views.AddAddressFormView.as_view(), name='add_address'),
    url(r'^add_locality/$', views.AddLocalityFormView.as_view(), name='add_locality'),
    url(r'^add_district/$', views.AddDistrictFormView.as_view(), name='add_district'),
    url(r'^add_region/$', views.AddRegionFormView.as_view(), name='add_region'),
    url(r'^add_country/$', views.AddCountryFormView.as_view(), name='add_country'),
    url(r'^add_mem_event/$', views.AddMemEventFormView.as_view(), name='add_mem_event'),
    # url(r'^placemark_icons/(?P<icon>.*)', views.get_placemark_icon),
]

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include(ws_patterns, 'ws', 'ws')),

]
