<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class BannersRequest extends FormRequest
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
        $maxSizeImage = 2 * 1024;
        $maxSizeVideo = 50 * 1024;

        $category = $this->input('category');
        $bannerRule = $this->isMethod('post') ? ['required'] : ['nullable'];

        if ($category === 'image') {
            $bannerRule[] = 'file';
            $bannerRule[] = 'mimes:jpg,jpeg,png,webp';
            $bannerRule[] = 'max:' . $maxSizeImage;
        } elseif ($category === 'video') {
            $bannerRule[] = 'file';
            $bannerRule[] = 'mimes:mp4,mov,avi,webm';
            $bannerRule[] = 'max:' . $maxSizeVideo;
        }

        return [
            'title' => ['nullable', 'string', 'max:255'],
            'section' => $this->isMethod('post') ? ['required', 'string', 'max:255'] : ['nullable', 'string', 'max:255'],
            'banner' => $bannerRule,
            'category' => 'required|in:image,video',
        ];
    }

    public function messages(): array
    {
        return [
            'banner.max' => $this->input('category') === 'video'
                ? 'Video tidak boleh lebih dari 50MB.'
                : 'Gambar tidak boleh lebih dari 2MB.',
        ];
    }

}
