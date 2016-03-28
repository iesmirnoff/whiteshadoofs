#!/usr/bin/python3
# -*- coding: utf-8 -*-

from django.contrib.admin import widgets
from django.utils.safestring import mark_safe


class MultiFileInput(widgets.AdminFileWidget):

    def render(self, name, value, attrs=None):
        attrs['multiple'] = 'true'
        output = super(MultiFileInput, self).render(name, value, attrs=None)
        return mark_safe(output)