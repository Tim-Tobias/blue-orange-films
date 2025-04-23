<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrewRoles extends Model
{
    use HasFactory;
    
    protected $table      = 'crew_roles';
    protected $primaryKey = 'id';


}
