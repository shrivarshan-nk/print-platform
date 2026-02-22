# app/core/constants.py

import enum


class UserRole(str, enum.Enum):
    STUDENT = "student"
    SHOP_ADMIN = "shop_admin"


class ExecutionMode(str, enum.Enum):
    MANUAL = "manual"
    ASSISTED = "assisted"
    AUTO = "auto"


class PaymentMode(str, enum.Enum):
    COUNTER = "counter"
    PREPAID = "prepaid"
    BOTH = "both"


class PrintStatus(str, enum.Enum):
    UPLOADED = "uploaded"
    PAYMENT_PENDING = "payment_pending"
    PAYMENT_CONFIRMED = "payment_confirmed"
    READY_TO_PRINT = "ready_to_print"
    PRINTING = "printing"
    PRINTED = "printed"
    COLLECTED = "collected"
    CANCELLED = "cancelled"


class ColorMode(str, enum.Enum):
    BW = "bw"
    COLOR = "color"


class PaperSize(str, enum.Enum):
    A4 = "A4"
    A3 = "A3"# -*- coding: utf-8 -*-

