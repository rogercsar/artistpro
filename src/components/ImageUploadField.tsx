import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploadFieldProps {
    label: string
    value?: string
    onChange: (value: string) => void
    className?: string
}

export function ImageUploadField({ label, value, onChange, className }: ImageUploadFieldProps) {
    const [preview, setPreview] = useState<string | null>(value || null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setPreview(result)
                onChange(result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemove = () => {
        setPreview(null)
        onChange('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className={className}>
            <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>

            {!preview ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-brand-400 hover:bg-brand-50/50"
                >
                    <div className="mb-3 rounded-full bg-white p-3 shadow-sm ring-1 ring-slate-100 transition group-hover:scale-110 group-hover:shadow-md">
                        <Upload size={20} className="text-slate-400 group-hover:text-brand-500" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Clique para enviar</p>
                    <p className="text-xs text-slate-500">JPG, PNG ou GIF</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <img
                        src={preview}
                        alt={label}
                        className="aspect-[3/4] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 transition hover:bg-black/10">
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-slate-600 shadow-sm backdrop-blur-sm transition hover:bg-red-50 hover:text-red-600"
                            title="Remover foto"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
