#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from django import forms
from django.contrib.auth import forms as auth_forms
from django.contrib.auth.models import User

from ws_app import models


class UserCreationForm(auth_forms.UserCreationForm):

    class Meta:
        model = User
        fields = (
            'email',
            'username',
            'first_name',
            'last_name',
        )


class AddObjectForm(forms.ModelForm):

    class Meta:
        model = models.Object
        exclude = (
            'user',
            'address',
        )
        localized_fields = '__all__'


class AddMemEventForm(forms.ModelForm):

    class Meta:
        model = models.Mem_event
        fields = (
            'title',
            'description',
        )


class AddRegionForm(forms.ModelForm):

    class Meta:
        model = models.Region
        fields = (
            'title',
            'country',
        )


class AddDistrictForm(forms.ModelForm):

    class Meta:
        model = models.District
        fields = (
            'title',
            'region',
        )


class AddLocalityForm(forms.ModelForm):

    class Meta:
        model = models.Locality
        fields = (
            'title',
            'district',
        )


class AddAddressForm(forms.ModelForm):

    class Meta:
        model = models.Address
        fields = (
            'street',
            'locality',
        )


class PointAddressForm(forms.Form):
    latitude = forms.FloatField(label='Широта', widget=forms.TextInput)
    longitude = forms.FloatField(label='Долгота', widget=forms.TextInput)
    address = forms.CharField(label='Адрес')
    country = forms.CharField(widget=forms.HiddenInput)
    region = forms.CharField(widget=forms.HiddenInput, required=False)
    district = forms.CharField(widget=forms.HiddenInput, required=False)
    locality = forms.CharField(widget=forms.HiddenInput, required=False)
    street = forms.CharField(widget=forms.HiddenInput, required=False)


class AddCountryForm(forms.ModelForm):

    class Meta:
        model = models.Country
        fields = (
            'title',
        )


class TestForm(forms.Form):
    oops = forms.CharField(label='oops', widget=forms.Textarea)