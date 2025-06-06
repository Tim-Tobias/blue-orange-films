<?php

namespace App\Http\Requests\Dashboard;

use App\Http\Enum\UserRole as EnumUserRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user');

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                        'required',
                        'email',
                        Rule::unique('users', 'email')->ignore($userId),
                    ],
            'password' => [$this->isMethod('post') ? 'required' : 'nullable', 'min:6', 'confirmed'],
            'role' => ['required', Rule::in(['admin', 'user'])],
        ];
    }
}
