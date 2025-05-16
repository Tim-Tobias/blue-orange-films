<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamName extends Model
{
    protected $table = 'team_names';

    protected $fillable = ['name'];

    public function teams()
    {
        return $this->hasMany(ProjectTeam::class, 'id_name_crew');
    }
}
