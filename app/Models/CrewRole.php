<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrewRole extends Model
{
  use HasFactory;

  protected $table = 'crew_roles';

  protected $fillable = ['name'];

  public function teams()
  {
      return $this->hasMany(ProjectTeam::class, 'id_crew_roles');
  }
}
