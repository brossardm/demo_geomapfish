# -*- coding: utf-8 -*-

import logging

from pyramid.i18n import TranslationStringFactory

from c2cgeoportal.models import *  # noqa
# from c2cgeoportal.models import _schema

_ = TranslationStringFactory('demo-server')
log = logging.getLogger(__name__)
