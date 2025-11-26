import { useState } from 'react'
import { Image, Video, Upload, X } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'
import { useApp } from '../context/AppContext'
import type { ArtistProfile } from '../types'

interface UploadMediaModalProps {
  isOpen: boolean
  onClose: () => void
  artist: ArtistProfile
}

export function UploadMediaModal({ isOpen, onClose, artist }: UploadMediaModalProps) {
  const { updateProfile } = useApp()
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo')
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Criar preview
    if (mediaType === 'photo' && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else if (mediaType === 'video' && selectedFile.type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)

    // Simular upload (em produção, isso seria uma chamada à API)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Gerar URL temporária (em produção, seria a URL retornada pela API)
    const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?auto=format&fit=crop&w=800&q=80`

    // Atualizar perfil
    const updatedArtist: ArtistProfile = {
      ...artist,
      portfolio: {
        photos:
          mediaType === 'photo'
            ? [...artist.portfolio.photos, mockUrl]
            : artist.portfolio.photos,
        videos:
          mediaType === 'video'
            ? [...artist.portfolio.videos, mockUrl]
            : artist.portfolio.videos,
      },
    }

    updateProfile(updatedArtist)
    setUploading(false)
    setFile(null)
    setPreview(null)
    onClose()
  }

  const handleRemovePreview = () => {
    setFile(null)
    setPreview(null)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar mídia ao portfólio"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={uploading}>
            Cancelar
          </Button>
          <Button onClick={handleUpload} disabled={!file || uploading} loading={uploading}>
            {uploading ? 'Enviando...' : 'Enviar mídia'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Tipo de mídia */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">Tipo de mídia</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setMediaType('photo')
                setFile(null)
                setPreview(null)
              }}
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 p-4 transition ${
                mediaType === 'photo'
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Image size={20} />
              <span className="font-semibold">Foto</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMediaType('video')
                setFile(null)
                setPreview(null)
              }}
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 p-4 transition ${
                mediaType === 'video'
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Video size={20} />
              <span className="font-semibold">Vídeo</span>
            </button>
          </div>
        </div>

        {/* Upload area */}
        {!preview ? (
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Selecionar arquivo
            </label>
            <label
              htmlFor="media-upload"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-brand-400 hover:bg-brand-50/50"
            >
              <Upload size={32} className="mb-3 text-slate-400" />
              <p className="mb-1 font-semibold text-slate-700">
                Clique para selecionar ou arraste o arquivo aqui
              </p>
              <p className="text-sm text-slate-500">
                {mediaType === 'photo'
                  ? 'Formatos: JPG, PNG, GIF (máx. 10MB)'
                  : 'Formatos: MP4, MOV, WEBM (máx. 100MB)'}
              </p>
              <input
                id="media-upload"
                type="file"
                accept={mediaType === 'photo' ? 'image/*' : 'video/*'}
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">Preview</label>
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <button
                onClick={handleRemovePreview}
                className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-lg transition hover:bg-slate-100"
                aria-label="Remover preview"
              >
                <X size={16} className="text-slate-600" />
              </button>
              {mediaType === 'photo' ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-64 w-full rounded-xl object-cover"
                />
              ) : (
                <video
                  src={preview}
                  controls
                  className="h-64 w-full rounded-xl object-cover"
                />
              )}
              <p className="mt-2 text-sm text-slate-600">{file?.name}</p>
            </div>
          </div>
        )}

        {/* Estatísticas do portfólio */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700">Seu portfólio atual</p>
          <div className="mt-2 flex gap-4 text-sm text-slate-600">
            <span>{artist.portfolio.photos.length} fotos</span>
            <span>{artist.portfolio.videos.length} vídeos</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

