import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button } from '../components/Button'
import { ImageUploadField } from '../components/ImageUploadField'
import type { ArtistProfile, ContractorProfile } from '../types'

export function EditProfilePage() {
  const { currentUser } = useApp()
  const navigate = useNavigate()

  if (!currentUser) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        <p className="font-semibold">Faça login para editar seu perfil</p>
        <Button className="mt-4" onClick={() => navigate('/login')}>
          Ir para login
        </Button>
      </div>
    )
  }

  if (currentUser.role === 'admin') {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        <p className="font-semibold">Administradores não podem editar perfil por esta página</p>
      </div>
    )
  }

  return currentUser.role === 'artist' ? (
    <EditArtistProfile artist={currentUser as ArtistProfile} />
  ) : (
    <EditContractorProfile contractor={currentUser as ContractorProfile} />
  )
}

function EditArtistProfile({ artist }: { artist: ArtistProfile }) {
  const { updateProfile } = useApp()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: artist.name,
    bio: artist.bio,
    phone: artist.phone,
    location: artist.location,
    heroTagline: artist.heroTagline,
    highlight: artist.highlight,
    skills: artist.skills.join(', '),
    artForms: artist.artForms.join(', '),
    specialties: artist.specialties.join(', '),
    preferredCities: artist.preferredCities.join(', '),
    availability: artist.availability.join(', '),
    cnpj: artist.cnpj || '',
    facePhoto: artist.facePhoto || '',
    fullBodyPhoto: artist.fullBodyPhoto || '',
    sidePhoto: artist.sidePhoto || '',
    social: {
      instagram: artist.social?.instagram || '',
      youtube: artist.social?.youtube || '',
      website: artist.social?.website || '',
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const updated = {
      ...artist,
      name: formData.name,
      bio: formData.bio,
      phone: formData.phone,
      location: formData.location,
      heroTagline: formData.heroTagline,
      highlight: formData.highlight,
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      artForms: formData.artForms.split(',').map((s) => s.trim()).filter(Boolean),
      specialties: formData.specialties.split(',').map((s) => s.trim()).filter(Boolean),
      preferredCities: formData.preferredCities.split(',').map((s) => s.trim()).filter(Boolean),
      availability: formData.availability.split(',').map((s) => s.trim()).filter(Boolean),
      cnpj: formData.cnpj,
      facePhoto: formData.facePhoto,
      fullBodyPhoto: formData.fullBodyPhoto,
      sidePhoto: formData.sidePhoto,
      social: formData.social,
    }

    updateProfile(updated)
    setLoading(false)
    navigate('/profile')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/profile')} iconLeft={<ArrowLeft size={16} />}>
          Voltar
        </Button>
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-900">Editar Perfil</h1>
          <p className="text-slate-600">Atualize suas informações e destaque seu trabalho</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Informações Básicas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nome completo</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Telefone</label>
              <input
                type="tel"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">CNPJ</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Localização</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Tagline (frase de destaque)</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.heroTagline}
                onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
                placeholder="Ex: Bailarina profissional especializada em dança contemporânea"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Biografia</label>
              <textarea
                required
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Destaque</label>
              <textarea
                rows={2}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.highlight}
                onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                placeholder="Uma frase ou texto curto que destaque seu diferencial"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Fotos Profissionais</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <ImageUploadField
              label="Foto de Rosto"
              value={formData.facePhoto}
              onChange={(value) => setFormData({ ...formData, facePhoto: value })}
            />
            <ImageUploadField
              label="Foto de Corpo Inteiro"
              value={formData.fullBodyPhoto}
              onChange={(value) => setFormData({ ...formData, fullBodyPhoto: value })}
            />
            <ImageUploadField
              label="Foto Lateral"
              value={formData.sidePhoto}
              onChange={(value) => setFormData({ ...formData, sidePhoto: value })}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Habilidades e Especialidades</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Habilidades (separadas por vírgula)
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Ex: Dança Contemporânea, Ballet Clássico, Jazz"
              />
              <p className="mt-2 text-xs text-slate-500">
                {formData.skills.split(',').filter(Boolean).length} habilidades adicionadas
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Formas de arte (separadas por vírgula)
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.artForms}
                onChange={(e) => setFormData({ ...formData, artForms: e.target.value })}
                placeholder="Ex: Dança, Teatro, Performance"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Especialidades (separadas por vírgula)
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.specialties}
                onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                placeholder="Ex: Coreografia, Ensino, Direção"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Disponibilidade e Preferências</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Disponibilidade (separada por vírgula)
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="Ex: Segunda-feira, Quarta-feira, Sexta-feira"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Cidades preferidas (separadas por vírgula)
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.preferredCities}
                onChange={(e) => setFormData({ ...formData, preferredCities: e.target.value })}
                placeholder="Ex: São Paulo, Rio de Janeiro, Belo Horizonte"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Redes Sociais</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Instagram</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.social.instagram}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })}
                placeholder="@seuinstagram"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">YouTube</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.social.youtube}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, youtube: e.target.value } })}
                placeholder="URL do canal"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Website</label>
              <input
                type="url"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.social.website}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, website: e.target.value } })}
                placeholder="https://seusite.com"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/profile')}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading} iconLeft={<Save size={16} />}>
            Salvar alterações
          </Button>
        </div>
      </form>
    </div>
  )
}

function EditContractorProfile({ contractor }: { contractor: ContractorProfile }) {
  const { updateProfile } = useApp()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: contractor.name,
    company: contractor.company,
    headline: contractor.headline,
    bio: contractor.bio,
    phone: contractor.phone,
    location: contractor.location,
    tags: contractor.tags.join(', '),
    talentNeeds: contractor.talentNeeds.join(', '),
    social: {
      instagram: contractor.social?.instagram || '',
      youtube: contractor.social?.youtube || '',
      website: contractor.social?.website || '',
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const updated = {
      ...contractor,
      name: formData.name,
      company: formData.company,
      headline: formData.headline,
      bio: formData.bio,
      phone: formData.phone,
      location: formData.location,
      tags: formData.tags.split(',').map((s) => s.trim()).filter(Boolean),
      talentNeeds: formData.talentNeeds.split(',').map((s) => s.trim()).filter(Boolean),
      social: formData.social,
    }

    updateProfile(updated)
    setLoading(false)
    navigate('/profile')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/profile')} iconLeft={<ArrowLeft size={16} />}>
          Voltar
        </Button>
        <div>
          <h1 className="font-display text-3xl font-semibold text-slate-900">Editar Perfil da Empresa</h1>
          <p className="text-slate-600">Atualize as informações da sua empresa</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Informações da Empresa</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nome do responsável</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nome da empresa</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Headline</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="Ex: Produtora especializada em eventos corporativos"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Telefone</label>
              <input
                type="tel"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Localização</label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Sobre a empresa</label>
              <textarea
                required
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Tags e Necessidades</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Tags (separadas por vírgula)</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Ex: Eventos Corporativos, Shows, Festivais"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Necessidades de talentos (separadas por vírgula)
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.talentNeeds}
                onChange={(e) => setFormData({ ...formData, talentNeeds: e.target.value })}
                placeholder="Ex: Dançarinos, Músicos, Performers"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8">
          <h2 className="mb-6 font-display text-xl font-semibold text-slate-900">Redes Sociais</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Instagram</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.social.instagram}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, instagram: e.target.value } })}
                placeholder="@empresa"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">YouTube</label>
              <input
                type="text"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.social.youtube}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, youtube: e.target.value } })}
                placeholder="URL do canal"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Website</label>
              <input
                type="url"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand-500 focus:outline-none"
                value={formData.social.website}
                onChange={(e) => setFormData({ ...formData, social: { ...formData.social, website: e.target.value } })}
                placeholder="https://empresa.com"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/profile')}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading} iconLeft={<Save size={16} />}>
            Salvar alterações
          </Button>
        </div>
      </form>
    </div>
  )
}

