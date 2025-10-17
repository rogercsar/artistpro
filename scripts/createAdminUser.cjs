// Load environment variables from .env if available
try { require('dotenv').config(); } catch (e) {}
const { createClient } = require('@supabase/supabase-js');

async function main() {
  const url = process.env.SUPABASE_PROJECT_URL || process.env.REACT_APP_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error('Defina SUPABASE_PROJECT_URL e SUPABASE_SERVICE_ROLE_KEY no .env');
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@artistpro.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin#art25!';
  const adminName = process.env.ADMIN_NAME || 'Admin APro';

  // Create auth user with admin role in metadata
  const { data: userData, error: adminErr } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
    user_metadata: { name: adminName, role: 'admin' }
  });

  if (adminErr) {
    if (adminErr.message && adminErr.message.includes('already registered')) {
      console.log('Usuário admin já existe, buscando...');
    } else {
      console.error('Erro criando usuário admin:', adminErr);
      process.exit(1);
    }
  }

  const adminUser = userData?.user;
  if (!adminUser) {
    // Try to fetch existing by email
    const { data: list, error: listErr } = await supabase.auth.admin.listUsers();
    if (listErr) {
      console.error('Erro listando usuários:', listErr);
      process.exit(1);
    }
    const existing = list.users.find(u => u.email === adminEmail);
    if (!existing) {
      console.error('Usuário admin não encontrado e não criado. Abortando.');
      process.exit(1);
    }
    await upsertProfile(supabase, existing.id, adminEmail, adminName);
    console.log('Admin pronto:', existing.id, adminEmail);
    return;
  }

  await upsertProfile(supabase, adminUser.id, adminEmail, adminName);
  console.log('Admin criado:', adminUser.id, adminEmail);
}

async function upsertProfile(supabase, id, email, name) {
  const { error } = await supabase.from('profiles').upsert({
    id,
    email,
    name,
    role: 'admin',
    is_verified: true,
    level: 'pro'
  }, { onConflict: 'id' });
  if (error) {
    console.error('Erro upsert profile admin:', error);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});