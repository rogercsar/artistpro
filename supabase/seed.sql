-- Opcional: categorias de exemplo e atualização de perfis/eventos
-- Este arquivo serve como base de referência. Ajuste conforme sua necessidade.

-- Exemplo: garantir que algum contratante tenha contractor_category
update public.profiles set contractor_category = 'dance'
where role = 'contractor' and contractor_category is null;

-- Exemplo: marcar artistas de dança
update public.profiles set category = 'dance'
where role = 'artist' and category is null;