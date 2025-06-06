<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamName extends Model
{

    use HasFactory;

    protected $table = 'team_names';

    protected $fillable = ['name'];

    public function teams()
    {
        return $this->hasMany(ProjectTeam::class, 'id_name_crew');
    }
}
