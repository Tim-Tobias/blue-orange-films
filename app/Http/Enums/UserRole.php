<?php

namespace App\Http\Enum;

enum UserRole: string
{
    case ADMIN = 'admin';
    case USER = 'user';
}
