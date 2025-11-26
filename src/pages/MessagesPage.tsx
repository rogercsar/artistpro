import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Send, ArrowLeft, MessageCircle, User } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import type { MessageThread, Message } from '../types'

export function MessagesPage() {
  const { data, currentUser } = useApp()
  const { threadId } = useParams()
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threadId || null)

  if (!currentUser) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-600">
        <p className="font-semibold">Faça login para acessar suas mensagens</p>
        <Link to="/login" className="mt-4 inline-block">
          <Button>Fazer login</Button>
        </Link>
      </div>
    )
  }

  const selectedThread = selectedThreadId
    ? data.threads.find((t) => t.id === selectedThreadId)
    : null

  return (
    <div className="grid h-[calc(100vh-200px)] gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-100 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-slate-900">Conversas</h2>
          <Badge variant="neutral">{data.threads.length}</Badge>
        </div>
        <div className="space-y-2 overflow-y-auto">
          {data.threads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
              Nenhuma conversa ainda. Entre em contato com artistas ou contratantes através dos perfis.
            </div>
          ) : (
            data.threads.map((thread) => {
              const otherParticipantId = thread.participants.find((id) => id !== currentUser.id)
              const otherUser =
                data.artists.find((a) => a.id === otherParticipantId) ||
                data.contractors.find((c) => c.id === otherParticipantId)

              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedThreadId === thread.id
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-slate-200 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-slate-200">
                      {otherUser?.avatar ? (
                        <img src={otherUser.avatar} alt={otherUser.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <User size={20} className="text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">{otherUser?.name || 'Usuário'}</p>
                      <p className="truncate text-xs text-slate-500">{thread.lastMessagePreview}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(thread.updatedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    {thread.messages.some((m) => !m.read && m.toId === currentUser.id) && (
                      <div className="h-2 w-2 rounded-full bg-brand-600" />
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>

      <div className="md:col-span-2 rounded-3xl border border-slate-100 bg-white flex flex-col">
        {selectedThread ? (
          <MessageView thread={selectedThread} currentUserId={currentUser.id} data={data} />
        ) : (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <MessageCircle size={48} className="mx-auto text-slate-300" />
              <p className="mt-4 text-slate-600">Selecione uma conversa para começar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MessageView({
  thread,
  currentUserId,
  data,
}: {
  thread: MessageThread
  currentUserId: string
  data: any
}) {
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)

  const otherParticipantId = thread.participants.find((id) => id !== currentUserId)
  const otherUser =
    data.artists.find((a: any) => a.id === otherParticipantId) ||
    data.contractors.find((c: any) => c.id === otherParticipantId)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setSending(true)
    // Simular envio de mensagem
    setTimeout(() => {
      setNewMessage('')
      setSending(false)
    }, 500)
  }

  return (
    <>
      <div className="border-b border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
            {otherUser?.avatar ? (
              <img src={otherUser.avatar} alt={otherUser.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User size={16} className="text-slate-400" />
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{otherUser?.name || 'Usuário'}</p>
            <p className="text-xs text-slate-500">{otherUser?.role === 'artist' ? 'Artista' : 'Contratante'}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {thread.messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <p className="text-slate-500">Nenhuma mensagem ainda</p>
              <p className="mt-2 text-sm text-slate-400">Envie a primeira mensagem para começar a conversa</p>
            </div>
          </div>
        ) : (
          thread.messages.map((message: Message) => {
            const isFromMe = message.fromId === currentUserId
            return (
              <div key={message.id} className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    isFromMe ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`mt-1 text-xs ${
                      isFromMe ? 'text-brand-100' : 'text-slate-500'
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      <form onSubmit={handleSend} className="border-t border-slate-100 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 focus:border-brand-500 focus:outline-none"
            disabled={sending}
          />
          <Button type="submit" size="sm" loading={sending} iconLeft={<Send size={16} />}>
            Enviar
          </Button>
        </div>
      </form>
    </>
  )
}

