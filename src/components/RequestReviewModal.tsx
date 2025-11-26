import { useState } from 'react'
import { Star, Send, CheckCircle } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'
import { useApp } from '../context/AppContext'
import type { ArtistProfile } from '../types'

interface RequestReviewModalProps {
  isOpen: boolean
  onClose: () => void
  artist: ArtistProfile
}

export function RequestReviewModal({ isOpen, onClose, artist }: RequestReviewModalProps) {
  const { data } = useApp()
  const [selectedContractor, setSelectedContractor] = useState<string>('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  // Buscar contratantes com quem o artista já trabalhou (simulado)
  // Em produção, isso viria de eventos concluídos ou histórico
  const availableContractors = data.contractors.filter((contractor) => {
    // Verificar se há eventos onde o artista mostrou interesse e o contratante gostou
    return data.events.some(
      (event) =>
        event.contractorId === contractor.id &&
        event.interestedBy.includes(artist.id) &&
        event.likedBy.includes(artist.id),
    )
  })

  const handleSend = async () => {
    if (!selectedContractor || !message.trim()) return

    setSending(true)

    // Simular envio de solicitação
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Criar notificação para o contratante (em produção, seria via API)
    // Atualizar dados (em produção, isso seria feito via API)
    // Por enquanto, apenas mostramos sucesso
    setSending(false)
    setSent(true)

    // Resetar após 2 segundos
    setTimeout(() => {
      setSent(false)
      setSelectedContractor('')
      setMessage('')
      onClose()
    }, 2000)
  }

  if (sent) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Solicitação enviada" size="md">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 rounded-full bg-emerald-100 p-4">
            <CheckCircle size={32} className="text-emerald-600" />
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold text-slate-900">
            Solicitação enviada com sucesso!
          </h3>
          <p className="text-sm text-slate-600">
            O contratante receberá uma notificação e poderá avaliar seu trabalho.
          </p>
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pedir avaliação"
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={sending}>
            Cancelar
          </Button>
          <Button
            onClick={handleSend}
            disabled={!selectedContractor || !message.trim() || sending}
            loading={sending}
            iconLeft={<Send size={16} />}
          >
            {sending ? 'Enviando...' : 'Enviar solicitação'}
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="mb-4 text-sm text-slate-600">
            Solicite uma avaliação de contratantes com quem você já trabalhou ou demonstrou interesse
            mútuo.
          </p>
        </div>

        {availableContractors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-600">
              Você ainda não tem contratantes disponíveis para solicitar avaliação.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Complete trabalhos ou demonstre interesse mútuo em eventos para desbloquear esta
              funcionalidade.
            </p>
          </div>
        ) : (
          <>
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Selecionar contratante
              </label>
              <select
                value={selectedContractor}
                onChange={(e) => setSelectedContractor(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
              >
                <option value="">Selecione um contratante...</option>
                {availableContractors.map((contractor) => (
                  <option key={contractor.id} value={contractor.id}>
                    {contractor.name} ({contractor.company})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Mensagem personalizada (opcional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ex: Gostaria de receber seu feedback sobre minha performance no evento..."
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
              />
              <p className="mt-2 text-xs text-slate-500">
                Uma mensagem personalizada aumenta as chances de receber uma avaliação.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <Star size={20} className="mt-0.5 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">Por que pedir avaliação?</p>
                  <ul className="mt-2 space-y-1 text-xs text-amber-800">
                    <li>• Aumenta sua credibilidade no perfil</li>
                    <li>• Melhora sua visibilidade nas buscas</li>
                    <li>• Ajuda outros contratantes a conhecerem seu trabalho</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

