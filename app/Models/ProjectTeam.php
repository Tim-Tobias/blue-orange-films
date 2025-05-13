<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectTeam extends Model
{
    protected $table = 'project_teams';

    protected $fillable = [
        'id_project',
        'id_crew_roles',
        'id_name_crew',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'id_project');
    }

    public function role()
    {
        return $this->belongsTo(CrewRole::class, 'id_crew_roles');
    }

    public function nameCrew()
    {
        return $this->belongsTo(TeamName::class, 'id_name_crew');
    }
}
