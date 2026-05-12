import { useState, useMemo, useRef } from 'react'

/* ═══════════════════════════════════════════
   DESIGN TOKENS — IDE MKT DIGITAL
═══════════════════════════════════════════ */
const C = {
  bg0:     '#0E0618',
  bg1:     '#150D24',
  bg2:     '#1C1232',
  bg3:     '#231840',
  p100:    '#A855F7',
  p200:    '#9333EA',
  p300:    '#7C3AED',
  pGlow:   'rgba(168,85,247,0.25)',
  k100:    '#E879F9',
  k200:    '#D946EF',
  kGlow:   'rgba(232,121,249,0.20)',
  grad:    'linear-gradient(135deg, #A855F7 0%, #E879F9 100%)',
  gradDk:  'linear-gradient(135deg, #7C3AED 0%, #C026D3 100%)',
  gradBg:  'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(232,121,249,0.08) 100%)',
  border:  'rgba(168,85,247,0.18)',
  borderH: 'rgba(168,85,247,0.40)',
  white:   '#FFFFFF',
  g1:      '#C4B5D6',
  g2:      '#7A6A94',
  green:   '#34D399',
  yellow:  '#FBBF24',
  red:     '#F87171',
}

/* ─── DATA ─────────────────────────────────── */
const TODAY = new Date().toISOString().slice(0, 10)
const YM    = TODAY.slice(0, 7)
const Y     = TODAY.slice(0, 4)

const SEED = [
  {
    id: 1, color: '#A855F7', status: 'ativo',
    master: { empresa: 'Boutique Aroma', responsavel: 'Mariana Silva', cargo: 'CEO', whatsapp: '(11) 98765-4321', email: 'mariana@boutiquearoma.com', cnpj: '12.345.678/0001-90', segmento: 'E-commerce / Cosméticos', cidade: 'São Paulo – SP', site: 'boutiquearoma.com.br', instagram: '@boutiquearoma', facebook: 'boutiquearoma', tiktok: '@boutiquearoma', googleAds: 'Sim', metaAds: 'Sim', googleAnalytics: 'Sim', canalAtendimento: 'WhatsApp', smResponsavel: 'Ana Lima', gestorTrafego: 'Carlos Melo', designer: 'Bia Santos', atendimento: 'Juliana Costa' },
    estrategico: { proposta: 'Cosméticos naturais premium para mulheres 30+', diferencial: 'Fórmulas veganas, embalagem luxo, entrega expressa', tomVoz: 'Elegante, acolhedor, sofisticado', objetivo: 'Vender no e-commerce e gerar autoridade', concorrentesDirectos: 'Lola, Quem disse berenice', concorrentesRef: 'The Ordinary, Fenty Beauty', persona: 'Mulher 30–45 anos, classe B/A', idadeRange: '30–45', dorPrincipal: 'Produtos que prometem mas não entregam', desejoPrincipal: 'Pele bonita e saudável sem químico', objetivos: ['Vender no WhatsApp', 'Fortalecer marca', 'Crescer seguidores'], kpis: { CPL: 'R$18', ROAS: '3.2x', 'Leads/mês': 85, Alcance: '42k', Engajamento: '5.8%' } },
    contrato: { servicos: ['Social Media', 'Tráfego Pago', 'Vídeos IA'], inicio: `${Y}-02-01`, renovacao: `${Y}-08-01`, fidelidade: '6 meses', reajuste: 'Anual – IGPM', smPosts: 20, smStories: 5, smReels: 4, trafegoCampanhas: 3, trafegoPlataformas: 'Meta + Google', videosQtd: 4, videosDuracao: '30–60s', videosRevisoes: 2, slaEntrega: '3 dias úteis', slaAprovacao: '2 dias úteis', slaRevisoes: 2 },
    acessos: { metaBusiness: { login: 'mariana@boutiquearoma.com', status: 'ok' }, googleAds: { login: 'ads@boutiquearoma.com', status: 'ok' }, canva: { login: 'design@boutiquearoma.com', status: 'ok' }, site: { login: 'admin', status: 'ok' }, pixelAtivo: true, conversoes: true, dominioVerificado: true, tagManager: true },
    onboarding: { historiaEmpresa: 'Fundada em 2019 por Mariana, ex-farmacêutica apaixonada por cosméticos naturais.', ofertaPrincipal: 'Kit cuidados faciais vegano', materiais: { logo: true, manualMarca: true, bancoimagens: true, videos: false, depoimentos: true, cases: false }, estrategiaAprovada: true, identidadeAprovada: true, cronogramaAprovado: true },
    operacional: { temaMes: 'Verão: hidratação e proteção solar', campanha: 'Dia dos Namorados – Kit Casal', objetivoMes: 'Aumentar conversão 20%', calendario: [
      { id: 1, conteudo: 'Post produto: sérum facial', formato: 'Carrossel', data: `${YM}-10`, status: 'Publicado', responsavel: 'Ana Lima', aprovado: true },
      { id: 2, conteudo: 'Reel: rotina de skincare', formato: 'Reels', data: `${YM}-14`, status: 'Produção', responsavel: 'Bia Santos', aprovado: false },
      { id: 3, conteudo: 'Stories: bastidores da marca', formato: 'Stories', data: `${YM}-16`, status: 'Briefing', responsavel: 'Ana Lima', aprovado: false },
      { id: 4, conteudo: 'Post campanha Namorados', formato: 'Feed', data: `${YM}-20`, status: 'Aguardando cliente', responsavel: 'Bia Santos', aprovado: false },
    ] },
    trafego: { orcamentoMensal: 2500, meta: { cpm: 'R$12,40', ctr: '2.1%', cpc: 'R$0,59', leads: 85, cpl: 'R$18,20', frequencia: '2.3' }, google: { impressoes: '18.400', cliques: 620, conversoes: 34, cpa: 'R$42,00', qualidade: 8 }, otimizacoes: [{ data: `${YM}-05`, alteracao: 'Novo público lookalike 3%', resultado: 'CPL caiu 12%' }, { data: `${YM}-10`, alteracao: 'Criativo: vídeo testemunho', resultado: 'CTR +0.8pp' }] },
    videosIA: [{ id: 1, objetivo: 'Apresentação do sérum facial', roteiro: 'Avatar apresenta produto com benefícios em 30s', avatar: 'Feminino – brasileiro', plataforma: 'HeyGen', status: 'Aprovado', entregue: true, aprovado: true }],
    financeiro: { valorMensal: 3500, formaPagamento: 'PIX', diaVencimento: 5, ltv: 21000, margem: '64%', pagamentos: [{ id: 1, mes: `${Y}-03`, valor: 3500, status: 'pago', pago: `${Y}-03-05` }, { id: 2, mes: `${Y}-04`, valor: 3500, status: 'pago', pago: `${Y}-04-05` }, { id: 3, mes: YM, valor: 3500, status: 'pendente', pago: null }] },
    relacionamento: { saudeClassificacao: 'saudavel', satisfacao: 9, reunioes: [{ id: 1, data: `${YM}-03`, assuntos: 'Planejamento maio, criativo campanha', pendencias: 'Enviar briefing vídeo IA' }], feedback: [{ id: 1, data: `${YM}-01`, nota: 9, comentario: 'Excelente entrega do calendário' }] },
  },
  {
    id: 2, color: '#E879F9', status: 'ativo',
    master: { empresa: 'TechStart Soluções', responsavel: 'Ricardo Pimentel', cargo: 'Sócio-Diretor', whatsapp: '(21) 99344-5566', email: 'ricardo@techstart.com.br', cnpj: '98.765.432/0001-11', segmento: 'SaaS / Tech B2B', cidade: 'Rio de Janeiro – RJ', site: 'techstart.com.br', instagram: '@techstart_br', facebook: 'techstartbr', tiktok: '', googleAds: 'Sim', metaAds: 'Sim', googleAnalytics: 'Sim', canalAtendimento: 'E-mail', smResponsavel: 'Pedro Alves', gestorTrafego: 'Carlos Melo', designer: 'Bia Santos', atendimento: 'Juliana Costa' },
    estrategico: { proposta: 'Software de gestão financeira para PMEs', diferencial: 'IA integrada, onboarding em 1 dia', tomVoz: 'Técnico, direto, confiável', objetivo: 'Gerar leads qualificados B2B', concorrentesDirectos: 'Conta Azul, Omie', concorrentesRef: 'QuickBooks', persona: 'Dono de PME, 35–55 anos', idadeRange: '35–55', dorPrincipal: 'Perder dinheiro por falta de controle', desejoPrincipal: 'Controle total sem precisar de contador', objetivos: ['Gerar leads', 'Autoridade', 'Tráfego para site'], kpis: { CPL: 'R$45', ROAS: '4.1x', 'Leads/mês': 60, Alcance: '28k', Engajamento: '3.2%' } },
    contrato: { servicos: ['Social Media', 'Tráfego Pago'], inicio: `${Y}-01-01`, renovacao: `${Y}-07-01`, fidelidade: '12 meses', reajuste: 'Anual – IGPM', smPosts: 16, smStories: 4, smReels: 2, trafegoCampanhas: 4, trafegoPlataformas: 'Meta + Google + LinkedIn', videosQtd: 0, videosDuracao: '–', videosRevisoes: 0, slaEntrega: '2 dias úteis', slaAprovacao: '2 dias úteis', slaRevisoes: 1 },
    acessos: { metaBusiness: { login: 'mkt@techstart.com.br', status: 'ok' }, googleAds: { login: 'ads@techstart.com.br', status: 'ok' }, canva: { login: 'design@techstart.com.br', status: 'pendente' }, site: { login: 'admin', status: 'ok' }, pixelAtivo: true, conversoes: true, dominioVerificado: true, tagManager: false },
    onboarding: { historiaEmpresa: 'Fundada em 2021, 3 sócios, 400 clientes ativos.', ofertaPrincipal: 'Plano Pro – R$297/mês', materiais: { logo: true, manualMarca: false, bancoimagens: true, videos: true, depoimentos: false, cases: true }, estrategiaAprovada: true, identidadeAprovada: false, cronogramaAprovado: true },
    operacional: { temaMes: 'Controle financeiro: seu negócio no azul', campanha: 'Webinar gratuito de gestão financeira', objetivoMes: '60 leads via LinkedIn e Google', calendario: [
      { id: 1, conteudo: 'Artigo: 5 erros financeiros de PME', formato: 'Carrossel', data: `${YM}-08`, status: 'Publicado', responsavel: 'Pedro Alves', aprovado: true },
      { id: 2, conteudo: 'Case de sucesso cliente X', formato: 'Feed', data: `${YM}-15`, status: 'Revisão', responsavel: 'Bia Santos', aprovado: false },
    ] },
    trafego: { orcamentoMensal: 4500, meta: { cpm: 'R$22,10', ctr: '1.4%', cpc: 'R$1,58', leads: 38, cpl: 'R$44,70', frequencia: '1.8' }, google: { impressoes: '32.000', cliques: 890, conversoes: 22, cpa: 'R$68,00', qualidade: 7 }, otimizacoes: [{ data: `${YM}-07`, alteracao: 'Segmentação CEO e CFO', resultado: 'CPL B2B -18%' }] },
    videosIA: [],
    financeiro: { valorMensal: 8200, formaPagamento: 'Boleto', diaVencimento: 10, ltv: 98400, margem: '58%', pagamentos: [{ id: 1, mes: `${Y}-03`, valor: 8200, status: 'pago', pago: `${Y}-03-10` }, { id: 2, mes: `${Y}-04`, valor: 8200, status: 'pago', pago: `${Y}-04-10` }, { id: 3, mes: YM, valor: 8200, status: 'pendente', pago: null }] },
    relacionamento: { saudeClassificacao: 'saudavel', satisfacao: 8, reunioes: [{ id: 1, data: `${YM}-04`, assuntos: 'Revisão LinkedIn Ads, criativo B2B', pendencias: 'Aprovar identidade visual' }], feedback: [] },
  },
  {
    id: 3, color: '#C084FC', status: 'atenção',
    master: { empresa: 'Clínica Bem Estar', responsavel: 'Dra. Paula Fernandes', cargo: 'Diretora Clínica', whatsapp: '(31) 97788-1122', email: 'paula@clinicabemestar.com', cnpj: '55.123.456/0001-33', segmento: 'Saúde & Estética', cidade: 'Belo Horizonte – MG', site: 'clinicabemestar.com.br', instagram: '@clinicabemestar', facebook: 'clinicabemestarbh', tiktok: '@dra.paulafernandes', googleAds: 'Sim', metaAds: 'Sim', googleAnalytics: 'Não', canalAtendimento: 'WhatsApp', smResponsavel: 'Ana Lima', gestorTrafego: 'Carlos Melo', designer: 'Bia Santos', atendimento: 'Juliana Costa' },
    estrategico: { proposta: 'Estética avançada com resultados naturais', diferencial: 'Médica especialista, tecnologia de ponta', tomVoz: 'Acolhedor, científico, empático', objetivo: 'Agendar consultas e fortalecer autoridade', concorrentesDirectos: 'Clínica Renova, Studio Glow', concorrentesRef: 'Dr. Consulta', persona: 'Mulher 28–50, classe A/B', idadeRange: '28–50', dorPrincipal: 'Medo de resultado artificial', desejoPrincipal: 'Rejuvenescer com naturalidade', objetivos: ['Fortalecer marca', 'Gerar leads', 'Autoridade'], kpis: { CPL: 'R$28', ROAS: '2.8x', 'Leads/mês': 40, Alcance: '22k', Engajamento: '6.2%' } },
    contrato: { servicos: ['Social Media', 'Tráfego Pago'], inicio: `${Y}-01-15`, renovacao: `${Y}-07-15`, fidelidade: '6 meses', reajuste: 'Semestral', smPosts: 12, smStories: 4, smReels: 3, trafegoCampanhas: 2, trafegoPlataformas: 'Meta + Google', videosQtd: 0, videosDuracao: '–', videosRevisoes: 0, slaEntrega: '4 dias úteis', slaAprovacao: '3 dias úteis', slaRevisoes: 2 },
    acessos: { metaBusiness: { login: 'paula@clinicabemestar.com', status: 'ok' }, googleAds: { login: 'ads@clinicabemestar.com', status: 'problema' }, canva: { login: 'design@clinicabemestar.com', status: 'ok' }, site: { login: 'admin', status: 'ok' }, pixelAtivo: true, conversoes: false, dominioVerificado: true, tagManager: false },
    onboarding: { historiaEmpresa: 'Dra. Paula, 15 anos de experiência, fundou a clínica em 2018.', ofertaPrincipal: 'Harmonização facial completa', materiais: { logo: true, manualMarca: true, bancoimagens: false, videos: false, depoimentos: true, cases: true }, estrategiaAprovada: true, identidadeAprovada: true, cronogramaAprovado: false },
    operacional: { temaMes: 'Bioestimuladores: rejuvenescimento natural', campanha: 'Combo Skinbooster + Fio de Sustentação', objetivoMes: '40 leads para avaliação gratuita', calendario: [
      { id: 1, conteudo: 'Post: Antes e depois harmonização', formato: 'Feed', data: `${YM}-09`, status: 'Aguardando cliente', responsavel: 'Ana Lima', aprovado: false },
      { id: 2, conteudo: 'Reel: Dra Paula explica bioestimuladores', formato: 'Reels', data: `${YM}-13`, status: 'Briefing', responsavel: 'Ana Lima', aprovado: false },
    ] },
    trafego: { orcamentoMensal: 1800, meta: { cpm: 'R$16,80', ctr: '1.8%', cpc: 'R$0,93', leads: 32, cpl: 'R$28,40', frequencia: '2.1' }, google: { impressoes: '9.200', cliques: 310, conversoes: 8, cpa: 'R$95,00', qualidade: 6 }, otimizacoes: [{ data: `${YM}-03`, alteracao: 'Anúncio com depoimento real', resultado: 'CTR +0.5pp' }] },
    videosIA: [],
    financeiro: { valorMensal: 2800, formaPagamento: 'PIX', diaVencimento: 15, ltv: 16800, margem: '55%', pagamentos: [{ id: 1, mes: `${Y}-03`, valor: 2800, status: 'pago', pago: `${Y}-03-18` }, { id: 2, mes: `${Y}-04`, valor: 2800, status: 'pago', pago: `${Y}-04-17` }, { id: 3, mes: YM, valor: 2800, status: 'atrasado', pago: null }] },
    relacionamento: { saudeClassificacao: 'atencao', satisfacao: 6, reunioes: [{ id: 1, data: `${YM}-02`, assuntos: 'Google Ads abaixo do esperado', pendencias: 'Revisar estratégia de campanhas' }], feedback: [{ id: 1, data: `${YM}-02`, nota: 6, comentario: 'Google Ads não está convertendo' }] },
  },
]

/* ─── HELPERS ──────────────────────────────── */
const fmt  = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)
const fmtD = d => { if (!d) return '—'; const [y, m, dd] = d.split('-'); return `${dd}/${m}/${y}` }
const mon  = m => ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][+m - 1]
const CHIP_COLORS = ['#A855F7','#E879F9','#C084FC','#F0ABFC','#7C3AED','#9333EA','#D946EF','#F472B6']

const SAUDE = {
  saudavel: { label: 'Saudável', dot: '🟢', bg: 'rgba(52,211,153,0.10)', color: '#34D399' },
  atencao:  { label: 'Atenção',  dot: '🟡', bg: 'rgba(251,191,36,0.10)',  color: '#FBBF24' },
  risco:    { label: 'Risco',    dot: '🔴', bg: 'rgba(248,113,113,0.10)', color: '#F87171' },
}
const PAY_B = {
  pago:     { label: 'Pago',     bg: 'rgba(52,211,153,0.12)',  color: '#34D399' },
  pendente: { label: 'Pendente', bg: 'rgba(251,191,36,0.12)',  color: '#FBBF24' },
  atrasado: { label: 'Atrasado', bg: 'rgba(248,113,113,0.12)', color: '#F87171' },
}
const CAL_C = {
  'Briefing': '#7C3AED', 'Produção': '#A855F7', 'Revisão': '#FBBF24',
  'Aguardando cliente': '#E879F9', 'Aprovado': '#34D399', 'Publicado': '#60A5FA',
}
const CLIENT_TABS = [
  { id: 'master', icon: '🏢', label: 'Cadastro' },
  { id: 'estrategico', icon: '🎯', label: 'Estratégia' },
  { id: 'contrato', icon: '📋', label: 'Contrato' },
  { id: 'acessos', icon: '🔐', label: 'Acessos' },
  { id: 'onboarding', icon: '🚀', label: 'Onboarding' },
  { id: 'operacional', icon: '⚙️', label: 'Operação' },
  { id: 'trafego', icon: '📢', label: 'Tráfego' },
  { id: 'videosIA', icon: '🎬', label: 'Vídeos IA' },
  { id: 'financeiro', icon: '💳', label: 'Financeiro' },
  { id: 'relacionamento', icon: '🤝', label: 'Relacionamento' },
]

/* ─── MICRO COMPONENTS ─────────────────────── */
function IDELogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(145deg,#2D1060 0%,#4A1D96 100%)', border: '2px solid rgba(168,85,247,0.6)', boxShadow: '0 0 20px rgba(168,85,247,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 16, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>
          <span style={{ fontSize: 10, verticalAlign: 'super', opacity: 0.7 }}>1</span>DE
        </div>
        <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', marginTop: 1 }}>MKT DIGITAL</div>
      </div>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: '0.06em', lineHeight: 1, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IDE MKT</div>
        <div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.16em', marginTop: 2 }}>CRM · DIGITAL</div>
      </div>
    </div>
  )
}

function Ava({ name, color, size = 42 }) {
  const i = name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg,${color}CC,${color}66)`, border: `2px solid ${color}66`, boxShadow: `0 0 14px ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: size * 0.34, fontFamily: "'Syne', sans-serif" }}>{i}</div>
  )
}

function Badge({ label, bg, color }) {
  return <span style={{ background: bg, color, borderRadius: 20, padding: '3px 11px', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', whiteSpace: 'nowrap', border: `1px solid ${color}33` }}>{label?.toUpperCase()}</span>
}

function Card({ children, style = {}, glow, onClick }) {
  const [h, sH] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => sH(true)} onMouseLeave={() => sH(false)} style={{ background: `linear-gradient(145deg,${C.bg2} 0%,${C.bg3}88 100%)`, borderRadius: 16, padding: 22, border: `1px solid ${h && onClick ? C.borderH : C.border}`, boxShadow: h && glow ? `0 8px 32px ${glow}33,inset 0 1px 0 rgba(255,255,255,0.04)` : `0 4px 16px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.04)`, transition: 'all 0.2s', transform: h && onClick ? 'translateY(-2px)' : 'none', cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</div>
  )
}

function SH({ icon, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 17 }}>{icon}</span>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: '0.06em', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{title.toUpperCase()}</span>
    </div>
  )
}

function GBtn({ children, variant = 'grad', small, full, disabled, ...p }) {
  const V = {
    grad:    { background: C.grad, color: '#fff', border: 'none', boxShadow: `0 4px 18px ${C.pGlow}` },
    outline: { background: 'transparent', color: C.p100, border: `1.5px solid ${C.border}`, boxShadow: 'none' },
    ghost:   { background: C.gradBg, color: C.g1, border: `1px solid ${C.border}`, boxShadow: 'none' },
    success: { background: 'rgba(52,211,153,0.10)', color: '#34D399', border: '1px solid rgba(52,211,153,0.25)', boxShadow: 'none' },
    danger:  { background: 'rgba(248,113,113,0.10)', color: '#F87171', border: '1px solid rgba(248,113,113,0.25)', boxShadow: 'none' },
  }[variant] || {}
  return (
    <button {...p} disabled={disabled} style={{ ...V, borderRadius: 9, cursor: disabled ? 'not-allowed' : 'pointer', padding: small ? '5px 13px' : '9px 20px', fontSize: small ? 11 : 13, fontWeight: 700, letterSpacing: '0.04em', fontFamily: "'Syne', sans-serif", display: 'inline-flex', alignItems: 'center', gap: 5, width: full ? '100%' : undefined, justifyContent: full ? 'center' : undefined, opacity: disabled ? 0.5 : 1, transition: 'opacity 0.15s,transform 0.12s', ...p.style }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.opacity = '.82'; e.currentTarget.style.transform = 'scale(1.02)' } }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
    >{children}</button>
  )
}

function Fld({ label, ...p }) {
  const base = { width: '100%', padding: '10px 14px', border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13, outline: 'none', background: 'rgba(168,85,247,0.06)', boxSizing: 'border-box', color: C.white, transition: 'border-color 0.15s' }
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ fontSize: 10, fontWeight: 700, color: C.g2, marginBottom: 5, letterSpacing: '0.1em', fontFamily: "'Syne', sans-serif" }}>{label.toUpperCase()}</div>}
      {p.as === 'select' ? <select {...p} as={undefined} style={{ ...base, cursor: 'pointer' }}>{p.children}</select>
        : p.as === 'textarea' ? <textarea {...p} as={undefined} style={{ ...base, resize: 'vertical', minHeight: 72 }} />
          : <input {...p} style={base} />}
    </div>
  )
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,4,18,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: `linear-gradient(145deg,${C.bg1} 0%,${C.bg2} 100%)`, borderRadius: 20, padding: 32, maxWidth: wide ? 820 : 520, width: '100%', maxHeight: '92vh', overflowY: 'auto', border: `1px solid ${C.borderH}`, boxShadow: `0 32px 80px rgba(0,0,0,0.6),0 0 60px ${C.pGlow}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 20, letterSpacing: '0.06em', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{title}</span>
          <button onClick={onClose} style={{ background: C.gradBg, border: `1px solid ${C.border}`, borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 14, color: C.g1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function KPI({ label, value, color = C.p100, icon }) {
  return (
    <div style={{ background: `linear-gradient(145deg,${C.bg2},${C.bg3}88)`, borderRadius: 14, padding: '18px 20px', border: `1px solid ${C.border}`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
      {icon && <div style={{ fontSize: 20, marginBottom: 10 }}>{icon}</div>}
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 26, color, textShadow: `0 0 24px ${color}55`, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.g2, marginTop: 5, letterSpacing: '0.1em' }}>{label.toUpperCase()}</div>
    </div>
  )
}

function IR({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 12, color: C.g2, fontWeight: 600, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: C.white, fontWeight: 700, textAlign: 'right', maxWidth: '60%' }}>{value || '—'}</span>
    </div>
  )
}
function IB({ label, value }) {
  return (
    <div style={{ padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ fontSize: 9, color: C.g2, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 13, color: C.white, fontWeight: 600, lineHeight: 1.55 }}>{value || '—'}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */
export default function App() {
  const [clients, setClients] = useState(SEED)
  const [view, setView] = useState('dashboard')
  const [selId, setSelId] = useState(null)
  const [cTab, setCTab] = useState('master')
  const [modal, setModal] = useState(null)
  const [cashMonth, setCashMonth] = useState(YM)
  const [searchQ, setSearchQ] = useState('')
  const nextId = useRef(100)

  const sel = clients.find(c => c.id === selId)
  function open(id) { setSelId(id); setCTab('master'); setView('detail') }
  function markPaid(cid, pid) { setClients(p => p.map(c => c.id !== cid ? c : { ...c, financeiro: { ...c.financeiro, pagamentos: c.financeiro.pagamentos.map(p => p.id !== pid ? p : { ...p, status: 'pago', pago: TODAY }) } })) }
  function shiftM(d) { const [y, m] = cashMonth.split('-').map(Number); const dt = new Date(y, m - 1 + d, 1); setCashMonth(`${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`) }

  const MRR = useMemo(() => clients.filter(c => c.status === 'ativo').reduce((s, c) => s + c.financeiro.valorMensal, 0), [clients])
  const recebido = useMemo(() => clients.reduce((s, c) => s + c.financeiro.pagamentos.filter(p => p.mes === YM && p.status === 'pago').reduce((a, p) => a + p.valor, 0), 0), [clients])
  const aReceber = useMemo(() => clients.reduce((s, c) => s + c.financeiro.pagamentos.filter(p => p.mes === YM && p.status !== 'pago').reduce((a, p) => a + p.valor, 0), 0), [clients])
  const inadimp = useMemo(() => clients.filter(c => c.financeiro.pagamentos.some(p => p.status === 'atrasado')), [clients])
  const allEnt = useMemo(() => clients.flatMap(c => c.operacional.calendario.map(e => ({ ...e, empresa: c.master.empresa, color: c.color, cid: c.id }))), [clients])
  const cashRev = useMemo(() => { const r = clients.flatMap(c => c.financeiro.pagamentos.filter(p => p.mes === cashMonth).map(p => ({ ...p, empresa: c.master.empresa, color: c.color, cid: c.id }))); return { r, pg: r.filter(p => p.status === 'pago').reduce((s, p) => s + p.valor, 0), pd: r.filter(p => p.status !== 'pago').reduce((s, p) => s + p.valor, 0) } }, [clients, cashMonth])
  const calAll = useMemo(() => allEnt.slice().sort((a, b) => a.data.localeCompare(b.data)), [allEnt])
  const filtered = clients.filter(c => c.master.empresa.toLowerCase().includes(searchQ.toLowerCase()) || c.master.responsavel.toLowerCase().includes(searchQ.toLowerCase()))

  const emptyNC = { empresa: '', responsavel: '', cargo: '', whatsapp: '', email: '', cnpj: '', segmento: '', cidade: '', site: '', valorMensal: '', diaVencimento: '10', color: '#A855F7', servicos: [] }
  const [nc, setNC] = useState(emptyNC)
  function addClient() {
    const id = ++nextId.current
    setClients(p => [...p, {
      id, color: nc.color, status: 'ativo',
      master: { ...nc, instagram: '', facebook: '', tiktok: '', googleAds: 'Não', metaAds: 'Não', googleAnalytics: 'Não', canalAtendimento: 'WhatsApp', smResponsavel: '', gestorTrafego: '', designer: '', atendimento: '' },
      estrategico: { proposta: '', diferencial: '', tomVoz: '', objetivo: '', concorrentesDirectos: '', concorrentesRef: '', persona: '', idadeRange: '', dorPrincipal: '', desejoPrincipal: '', objetivos: [], kpis: {} },
      contrato: { servicos: nc.servicos, inicio: TODAY, renovacao: '', fidelidade: '', reajuste: '', smPosts: 0, smStories: 0, smReels: 0, trafegoCampanhas: 0, trafegoPlataformas: '', videosQtd: 0, videosDuracao: '', videosRevisoes: 0, slaEntrega: '', slaAprovacao: '', slaRevisoes: 0 },
      acessos: { metaBusiness: { login: '', status: 'pendente' }, googleAds: { login: '', status: 'pendente' }, canva: { login: '', status: 'pendente' }, site: { login: '', status: 'pendente' }, pixelAtivo: false, conversoes: false, dominioVerificado: false, tagManager: false },
      onboarding: { historiaEmpresa: '', ofertaPrincipal: '', materiais: { logo: false, manualMarca: false, bancoimagens: false, videos: false, depoimentos: false, cases: false }, estrategiaAprovada: false, identidadeAprovada: false, cronogramaAprovado: false },
      operacional: { temaMes: '', campanha: '', objetivoMes: '', calendario: [] },
      trafego: { orcamentoMensal: 0, meta: {}, google: {}, otimizacoes: [] },
      videosIA: [],
      financeiro: { valorMensal: Number(nc.valorMensal) || 0, formaPagamento: 'PIX', diaVencimento: Number(nc.diaVencimento) || 10, ltv: 0, margem: '–', pagamentos: [] },
      relacionamento: { saudeClassificacao: 'saudavel', satisfacao: 8, reunioes: [], feedback: [] },
    }])
    setNC(emptyNC); setModal(null)
  }

  const NAV = [
    { id: 'dashboard', icon: '◈', label: 'Dashboard' },
    { id: 'clients',   icon: '◉', label: 'Clientes' },
    { id: 'cashflow',  icon: '💰', label: 'Financeiro' },
    { id: 'calendar',  icon: '📅', label: 'Entregas' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: C.bg0, display: 'flex' }}>

      {/* SIDEBAR */}
      <aside style={{ width: 230, flexShrink: 0, background: `linear-gradient(180deg,${C.bg1} 0%,${C.bg0} 100%)`, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '22px 20px 20px', borderBottom: `1px solid ${C.border}` }}>
          <IDELogo />
        </div>
        <nav style={{ padding: '14px 10px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(n => (
            <div key={n.id} className="nav-item" onClick={() => setView(n.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: '0 10px 10px 0', borderLeft: `3px solid ${view === n.id ? C.p100 : 'transparent'}`, background: view === n.id ? 'rgba(168,85,247,0.13)' : 'transparent', color: view === n.id ? C.white : C.g2, fontSize: 13, fontWeight: view === n.id ? 700 : 500 }}>
              <span style={{ fontSize: 16 }}>{n.icon}</span>{n.label}
            </div>
          ))}
        </nav>
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 10px 6px' }}>
          <div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.16em', fontWeight: 700, padding: '0 4px 8px', fontFamily: "'Syne', sans-serif" }}>CLIENTES</div>
          {clients.map(c => (
            <div key={c.id} className="nav-item" onClick={() => open(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: '0 9px 9px 0', borderLeft: `3px solid ${selId === c.id && view === 'detail' ? c.color : 'transparent'}`, background: selId === c.id && view === 'detail' ? 'rgba(168,85,247,0.10)' : 'transparent', fontSize: 12, color: C.g1 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, boxShadow: `0 0 7px ${c.color}`, flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.master.empresa}</span>
              {c.financeiro.pagamentos.some(p => p.status === 'atrasado') && <span style={{ color: C.red, fontSize: 11, fontWeight: 700 }}>!</span>}
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 14px 18px' }}>
          <div style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.14) 0%,rgba(232,121,249,0.08) 100%)', borderRadius: 13, padding: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.14em', fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>MRR TOTAL</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 22, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{fmt(MRR)}</div>
            <div style={{ fontSize: 10, color: C.g2, marginTop: 3 }}>{clients.filter(c => c.status === 'ativo').length} clientes ativos</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>

        {/* DASHBOARD */}
        {view === 'dashboard' && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 30, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard</h1>
              <p style={{ color: C.g2, fontSize: 13, marginTop: 5 }}>IDE MKT Digital · {fmtD(TODAY)}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 22 }}>
              <KPI icon="💰" label="MRR" value={fmt(MRR)} color={C.p100} />
              <KPI icon="✅" label="Recebido" value={fmt(recebido)} color={C.green} />
              <KPI icon="⏳" label="A Receber" value={fmt(aReceber)} color={C.yellow} />
              <KPI icon="👥" label="Ativos" value={clients.filter(c => c.status === 'ativo').length} color={C.k100} />
              <KPI icon="⚠️" label="Inadimplentes" value={inadimp.length} color={inadimp.length > 0 ? C.red : C.green} />
              <KPI icon="📦" label="Ent. Atrasadas" value={allEnt.filter(e => e.status !== 'Publicado' && e.data < TODAY).length} color={C.yellow} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 16 }}>
              <Card>
                <SH icon="🩺" title="Saúde das Contas" />
                {clients.map(c => {
                  const sc = SAUDE[c.relacionamento.saudeClassificacao]
                  const pend = c.operacional.calendario.filter(e => e.status !== 'Publicado').length
                  return (
                    <div key={c.id} className="tr-hover" onClick={() => open(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 10px', borderRadius: 10, cursor: 'pointer', marginBottom: 4, transition: 'background .15s' }}>
                      <Ava name={c.master.empresa} color={c.color} size={40} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.master.empresa}</div>
                        <div style={{ fontSize: 11, color: C.g2, marginTop: 1 }}>{c.master.segmento}</div>
                      </div>
                      <Badge label={sc.dot + ' ' + sc.label} bg={sc.bg} color={sc.color} />
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 15, color: C.green, minWidth: 64, textAlign: 'right' }}>{fmt(c.financeiro.valorMensal)}</div>
                    </div>
                  )
                })}
              </Card>
              <Card>
                <SH icon="🚨" title="Pagamentos em Atraso" />
                {inadimp.length === 0
                  ? <div style={{ color: C.g2, textAlign: 'center', padding: '28px 0', fontSize: 13 }}>Tudo em dia! 🎉</div>
                  : inadimp.flatMap(c => c.financeiro.pagamentos.filter(p => p.status === 'atrasado').map(p => ({ ...p, empresa: c.master.empresa, color: c.color, cid: c.id }))).map(p => (
                    <div key={p.id} style={{ background: 'rgba(248,113,113,0.07)', borderRadius: 10, padding: '12px 14px', marginBottom: 8, border: '1px solid rgba(248,113,113,0.18)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{p.empresa}</span>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 15, color: C.red }}>{fmt(p.valor)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: C.red }}>Ref {mon(p.mes.split('-')[1])}/{p.mes.split('-')[0]}</span>
                        <GBtn variant="success" small onClick={() => markPaid(p.cid, p.id)}>✓ Pago</GBtn>
                      </div>
                    </div>
                  ))
                }
              </Card>
            </div>
            <Card>
              <SH icon="📅" title="Próximas Entregas" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(215px,1fr))', gap: 10 }}>
                {calAll.filter(e => e.status !== 'Publicado').slice(0, 8).map((e, i) => (
                  <div key={i} className="cal-card" onClick={() => open(e.cid)} style={{ background: C.bg3, borderRadius: 11, padding: '11px 14px', cursor: 'pointer', borderLeft: `3px solid ${e.color}` }}>
                    <div style={{ fontSize: 11, color: e.color, fontWeight: 700, marginBottom: 4 }}>{e.empresa}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>{e.conteudo}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: C.g2 }}>📅 {fmtD(e.data)}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: (CAL_C[e.status] || C.g2) + '22', color: CAL_C[e.status] || C.g2 }}>{e.status}</span>
                    </div>
                  </div>
                ))}
                {calAll.filter(e => e.status !== 'Publicado').length === 0 && <div style={{ color: C.g2, fontSize: 13 }}>Nenhuma pendência!</div>}
              </div>
            </Card>
          </div>
        )}

        {/* CLIENTES */}
        {view === 'clients' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 30, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Clientes</h1>
                <p style={{ color: C.g2, fontSize: 13, marginTop: 4 }}>{clients.length} empresas cadastradas</p>
              </div>
              <GBtn onClick={() => setModal('newClient')}>＋ Novo Cliente</GBtn>
            </div>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="🔍 Buscar empresa..." style={{ width: '100%', maxWidth: 340, padding: '10px 16px', border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 13, outline: 'none', background: 'rgba(168,85,247,0.06)', marginBottom: 18 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(285px,1fr))', gap: 14 }}>
              {filtered.map(c => {
                const sc = SAUDE[c.relacionamento.saudeClassificacao]
                const atrasado = c.financeiro.pagamentos.some(p => p.status === 'atrasado')
                const pend = c.operacional.calendario.filter(e => e.status !== 'Publicado').length
                return (
                  <Card key={c.id} onClick={() => open(c.id)} glow={c.color} style={{ borderTop: `3px solid ${c.color}`, padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <Ava name={c.master.empresa} color={c.color} size={50} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}>
                        <Badge label={sc.dot + ' ' + sc.label} bg={sc.bg} color={sc.color} />
                        {atrasado && <Badge label="⚠ Atrasado" bg="rgba(248,113,113,0.10)" color={C.red} />}
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 17, marginBottom: 3 }}>{c.master.empresa}</div>
                    <div style={{ fontSize: 12, color: C.g1, marginBottom: 4 }}>{c.master.responsavel} · {c.master.segmento}</div>
                    <div style={{ fontSize: 11, color: C.g2, marginBottom: 14 }}>📍 {c.master.cidade}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${C.border}`, paddingTop: 12, marginBottom: 12 }}>
                      <div><div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.1em', marginBottom: 2, fontWeight: 700 }}>MENSALIDADE</div><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 17, color: C.green }}>{fmt(c.financeiro.valorMensal)}</div></div>
                      <div style={{ textAlign: 'center' }}><div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.1em', marginBottom: 2, fontWeight: 700 }}>NPS</div><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 17, color: c.relacionamento.satisfacao >= 8 ? C.green : c.relacionamento.satisfacao >= 6 ? C.yellow : C.red }}>{c.relacionamento.satisfacao}/10</div></div>
                      <div style={{ textAlign: 'right' }}><div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.1em', marginBottom: 2, fontWeight: 700 }}>PENDÊNCIAS</div><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 17, color: pend > 0 ? C.yellow : C.green }}>{pend}</div></div>
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {c.contrato.servicos.map(s => <span key={s} style={{ fontSize: 10, background: 'rgba(168,85,247,0.12)', color: C.p100, padding: '3px 9px', borderRadius: 20, fontWeight: 700, border: `1px solid ${C.border}` }}>{s}</span>)}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* FINANCEIRO */}
        {view === 'cashflow' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 30, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Financeiro</h1>
                <p style={{ color: C.g2, fontSize: 13, marginTop: 4 }}>Receitas e pagamentos por período</p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <GBtn variant="outline" small onClick={() => shiftM(-1)}>‹</GBtn>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 15, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', minWidth: 126, textAlign: 'center' }}>{mon(cashMonth.split('-')[1])} {cashMonth.split('-')[0]}</span>
                <GBtn variant="outline" small onClick={() => shiftM(1)}>›</GBtn>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 22 }}>
              <KPI icon="✅" label="Recebido" value={fmt(cashRev.pg)} color={C.green} />
              <KPI icon="⏳" label="Pendente" value={fmt(cashRev.pd)} color={C.yellow} />
              <KPI icon="◈" label="Saldo" value={fmt(cashRev.pg - cashRev.pd)} color={cashRev.pg >= cashRev.pd ? C.green : C.red} />
            </div>
            <Card>
              <SH icon="💳" title={`Recebimentos — ${mon(cashMonth.split('-')[1])} ${cashMonth.split('-')[0]}`} />
              {cashRev.r.length === 0
                ? <div style={{ color: C.g2, textAlign: 'center', padding: '28px 0', fontSize: 13 }}>Nenhum lançamento neste mês.</div>
                : cashRev.r.map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: C.bg3, borderRadius: 11, marginBottom: 8, border: `1px solid ${C.border}` }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, boxShadow: `0 0 8px ${p.color}`, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{p.empresa}</div>
                      <div style={{ fontSize: 11, color: C.g2, marginTop: 2 }}>Ref: {mon(p.mes.split('-')[1])}/{p.mes.split('-')[0]}{p.pago && ` · Pago ${fmtD(p.pago)}`}</div>
                    </div>
                    <Badge label={PAY_B[p.status]?.label} bg={PAY_B[p.status]?.bg} color={PAY_B[p.status]?.color} />
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 17, minWidth: 78, textAlign: 'right' }}>{fmt(p.valor)}</span>
                    {p.status !== 'pago' && <GBtn variant="success" small onClick={() => markPaid(p.cid, p.id)}>✓ Pago</GBtn>}
                  </div>
                ))
              }
              <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px dashed ${C.border}` }}>
                <div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.14em', fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 14 }}>RESUMO POR CLIENTE</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(195px,1fr))', gap: 10 }}>
                  {clients.map(c => {
                    const pg = c.financeiro.pagamentos.filter(p => p.status === 'pago').reduce((s, p) => s + p.valor, 0)
                    const at = c.financeiro.pagamentos.filter(p => p.status === 'atrasado').reduce((s, p) => s + p.valor, 0)
                    return (
                      <div key={c.id} style={{ background: C.bg3, borderRadius: 10, padding: '12px 14px', borderLeft: `3px solid ${c.color}` }}>
                        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{c.master.empresa}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                          <span style={{ color: C.green, fontWeight: 700 }}>✓ {fmt(pg)}</span>
                          {at > 0 && <span style={{ color: C.red, fontWeight: 700 }}>⚠ {fmt(at)}</span>}
                        </div>
                        <div style={{ fontSize: 10, color: C.g2, marginTop: 4 }}>LTV: {c.financeiro.ltv ? fmt(c.financeiro.ltv) : '–'} · {c.financeiro.margem}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ENTREGAS */}
        {view === 'calendar' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 30, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Calendário de Entregas</h1>
              <p style={{ color: C.g2, fontSize: 13, marginTop: 4 }}>Todos os conteúdos de todos os clientes</p>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              {Object.entries(CAL_C).map(([s, col]) => <span key={s} style={{ fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: col + '1A', color: col }}>{s}</span>)}
            </div>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'rgba(168,85,247,0.08)', borderBottom: `1px solid ${C.border}` }}>
                    {['Cliente', 'Conteúdo', 'Formato', 'Data', 'Responsável', 'Status', '✓'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 9, fontFamily: "'Syne', sans-serif", letterSpacing: '0.12em', color: C.g2 }}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calAll.map((e, i) => (
                    <tr key={i} className="tr-hover" style={{ borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }} onClick={() => open(e.cid)}>
                      <td style={{ padding: '11px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: e.color, boxShadow: `0 0 6px ${e.color}` }} /><span style={{ fontWeight: 600, fontSize: 12 }}>{e.empresa}</span></div></td>
                      <td style={{ padding: '11px 16px', color: C.g1, maxWidth: 190, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.conteudo}</td>
                      <td style={{ padding: '11px 16px' }}><span style={{ fontSize: 11, background: 'rgba(168,85,247,0.10)', color: C.p100, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{e.formato}</span></td>
                      <td style={{ padding: '11px 16px', color: e.data < TODAY && e.status !== 'Publicado' ? C.red : C.g2, fontWeight: e.data < TODAY && e.status !== 'Publicado' ? 700 : 400 }}>{fmtD(e.data)}</td>
                      <td style={{ padding: '11px 16px', color: C.g2 }}>{e.responsavel}</td>
                      <td style={{ padding: '11px 16px' }}><span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: (CAL_C[e.status] || C.g2) + '1A', color: CAL_C[e.status] || C.g2 }}>{e.status}</span></td>
                      <td style={{ padding: '11px 16px', fontSize: 17 }}>{e.aprovado ? '✅' : '⏳'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {calAll.length === 0 && <div style={{ color: C.g2, textAlign: 'center', padding: 28, fontSize: 13 }}>Nenhuma entrega.</div>}
            </Card>
          </div>
        )}

        {/* DETALHE */}
        {view === 'detail' && sel && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
              <GBtn variant="outline" small onClick={() => setView('clients')}>← Clientes</GBtn>
              <Ava name={sel.master.empresa} color={sel.color} size={56} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 26, margin: 0 }}>{sel.master.empresa}</h1>
                  <Badge label={SAUDE[sel.relacionamento.saudeClassificacao]?.dot + ' ' + SAUDE[sel.relacionamento.saudeClassificacao]?.label} bg={SAUDE[sel.relacionamento.saudeClassificacao]?.bg} color={SAUDE[sel.relacionamento.saudeClassificacao]?.color} />
                </div>
                <div style={{ fontSize: 12, color: C.g2 }}>{sel.master.segmento} · {sel.master.cidade} · desde {fmtD(sel.contrato.inicio)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 28, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{fmt(sel.financeiro.valorMensal)}<span style={{ fontSize: 14, color: C.g2 }}>/mês</span></div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 22, overflowX: 'auto', paddingBottom: 4 }}>
              {CLIENT_TABS.map(t => (
                <button key={t.id} onClick={() => setCTab(t.id)} style={{ background: cTab === t.id ? C.grad : 'rgba(168,85,247,0.07)', border: `1px solid ${cTab === t.id ? 'transparent' : C.border}`, borderRadius: 9, padding: '7px 14px', cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: '0.04em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5, color: cTab === t.id ? '#fff' : C.g2, transition: 'all .15s', boxShadow: cTab === t.id ? `0 4px 15px ${C.pGlow}` : 'none' }}>
                  <span>{t.icon}</span>{t.label}
                </button>
              ))}
            </div>

            {cTab === 'master' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card><SH icon="🏢" title="Dados da Empresa" />{[['Empresa', sel.master.empresa], ['CNPJ', sel.master.cnpj], ['Segmento', sel.master.segmento], ['Cidade', sel.master.cidade], ['Site', sel.master.site]].map(([l, v]) => <IR key={l} label={l} value={v} />)}</Card>
              <Card><SH icon="👤" title="Contato" />{[['Responsável', sel.master.responsavel], ['Cargo', sel.master.cargo], ['WhatsApp', sel.master.whatsapp], ['E-mail', sel.master.email], ['Canal Principal', sel.master.canalAtendimento]].map(([l, v]) => <IR key={l} label={l} value={v} />)}</Card>
              <Card><SH icon="📱" title="Redes & Canais" />{[['Instagram', sel.master.instagram], ['Facebook', sel.master.facebook], ['TikTok', sel.master.tiktok], ['Google Ads', sel.master.googleAds], ['Meta Ads', sel.master.metaAds], ['Google Analytics', sel.master.googleAnalytics]].map(([l, v]) => <IR key={l} label={l} value={v} />)}</Card>
              <Card><SH icon="👥" title="Equipe" />{[['Social Media', sel.master.smResponsavel], ['Gestor Tráfego', sel.master.gestorTrafego], ['Designer/Editor', sel.master.designer], ['Atendimento', sel.master.atendimento]].map(([l, v]) => <IR key={l} label={l} value={v} />)}</Card>
            </div>}

            {cTab === 'estrategico' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card><SH icon="🎯" title="Posicionamento" />{[['Proposta de Valor', sel.estrategico.proposta], ['Diferenciais', sel.estrategico.diferencial], ['Tom de Voz', sel.estrategico.tomVoz], ['Objetivo', sel.estrategico.objetivo], ['Concorrentes Diretos', sel.estrategico.concorrentesDirectos], ['Referências', sel.estrategico.concorrentesRef]].map(([l, v]) => <IB key={l} label={l} value={v} />)}</Card>
              <Card><SH icon="🧑‍🤝‍🧑" title="Público-alvo" />{[['Persona', sel.estrategico.persona], ['Faixa Etária', sel.estrategico.idadeRange], ['Dor Principal', sel.estrategico.dorPrincipal], ['Desejo Principal', sel.estrategico.desejoPrincipal]].map(([l, v]) => <IB key={l} label={l} value={v} />)}<div style={{ marginTop: 14 }}><div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>OBJETIVOS</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{(sel.estrategico.objetivos || []).map(o => <span key={o} style={{ fontSize: 11, background: 'rgba(168,85,247,0.12)', color: C.p100, padding: '3px 10px', borderRadius: 20, fontWeight: 700, border: `1px solid ${C.border}` }}>{o}</span>)}</div></div></Card>
              <Card style={{ gridColumn: '1/-1' }}><SH icon="📊" title="KPIs" /><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(115px,1fr))', gap: 12 }}>{Object.entries(sel.estrategico.kpis || {}).map(([k, v]) => (<div key={k} style={{ background: C.bg3, borderRadius: 11, padding: 14, textAlign: 'center', border: `1px solid ${C.border}` }}><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 22, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div><div style={{ fontSize: 10, color: C.g2, fontWeight: 700, letterSpacing: '0.08em', marginTop: 4 }}>{k.toUpperCase()}</div></div>))}</div></Card>
            </div>}

            {cTab === 'contrato' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card><SH icon="📋" title="Vigência" />{[['Início', fmtD(sel.contrato.inicio)], ['Renovação', fmtD(sel.contrato.renovacao)], ['Fidelidade', sel.contrato.fidelidade], ['Reajuste', sel.contrato.reajuste]].map(([l, v]) => <IR key={l} label={l} value={v} />)}<div style={{ marginTop: 14 }}><div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>SERVIÇOS</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{(sel.contrato.servicos || []).map(s => <span key={s} style={{ fontSize: 11, background: C.grad, color: '#fff', padding: '4px 12px', borderRadius: 20, fontWeight: 700 }}>{s}</span>)}</div></div></Card>
              <Card><SH icon="⏱" title="SLA" />{[['Prazo Entrega', sel.contrato.slaEntrega], ['Prazo Aprovação', sel.contrato.slaAprovacao], ['Revisões', sel.contrato.slaRevisoes + ' revisões']].map(([l, v]) => <IR key={l} label={l} value={v} />)}</Card>
              <Card><SH icon="📱" title="Social Media" />{[['Posts/mês', sel.contrato.smPosts], ['Stories/semana', sel.contrato.smStories], ['Reels/mês', sel.contrato.smReels]].map(([l, v]) => (<div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}><span style={{ fontSize: 12, color: C.g2, fontWeight: 600 }}>{l}</span><span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 22, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</span></div>))}</Card>
              <Card><SH icon="📢" title="Tráfego Pago" />{[['Campanhas', sel.contrato.trafegoCampanhas], ['Plataformas', sel.contrato.trafegoPlataformas]].map(([l, v]) => <IR key={l} label={l} value={v} />)}</Card>
            </div>}

            {cTab === 'acessos' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card><SH icon="🔐" title="Plataformas" />{[['Meta Business Suite', sel.acessos.metaBusiness], ['Google Ads', sel.acessos.googleAds], ['Canva', sel.acessos.canva], ['Site / Host', sel.acessos.site]].map(([label, acc]) => (<div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: `1px solid ${C.border}` }}><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div><div style={{ fontSize: 11, color: C.g2, marginTop: 2 }}>{acc?.login || '—'}</div></div><Badge label={acc?.status || '—'} bg={acc?.status === 'ok' ? 'rgba(52,211,153,0.10)' : acc?.status === 'problema' ? 'rgba(248,113,113,0.10)' : 'rgba(251,191,36,0.10)'} color={acc?.status === 'ok' ? C.green : acc?.status === 'problema' ? C.red : C.yellow} /></div>))}</Card>
              <Card><SH icon="⚙️" title="Checklist Técnico" />{[['Pixel Ativo', sel.acessos.pixelAtivo], ['Conversões Configuradas', sel.acessos.conversoes], ['Domínio Verificado', sel.acessos.dominioVerificado], ['Google Tag Manager', sel.acessos.tagManager]].map(([l, v]) => (<div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: `1px solid ${C.border}` }}><span style={{ fontSize: 13, fontWeight: 600 }}>{l}</span><span style={{ fontSize: 22 }}>{v ? '✅' : '❌'}</span></div>))}</Card>
            </div>}

            {cTab === 'onboarding' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card style={{ gridColumn: '1/-1' }}><SH icon="🚀" title="Briefing" /><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>{[['História da Empresa', sel.onboarding.historiaEmpresa], ['Oferta Principal', sel.onboarding.ofertaPrincipal]].map(([l, v]) => (<div key={l}><div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.1em', fontWeight: 700, marginBottom: 6 }}>{l.toUpperCase()}</div><div style={{ fontSize: 13, color: C.white, lineHeight: 1.6, background: C.bg3, borderRadius: 10, padding: 14, border: `1px solid ${C.border}` }}>{v || '—'}</div></div>))}</div></Card>
              <Card><SH icon="📁" title="Materiais" />{[['Logo', 'logo'], ['Manual da Marca', 'manualMarca'], ['Banco de Imagens', 'bancoimagens'], ['Vídeos', 'videos'], ['Depoimentos', 'depoimentos'], ['Cases', 'cases']].map(([l, k]) => (<div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${C.border}` }}><span style={{ fontSize: 13, fontWeight: 600 }}>{l}</span><span style={{ fontSize: 20 }}>{sel.onboarding.materiais?.[k] ? '✅' : '⏳'}</span></div>))}</Card>
              <Card><SH icon="✔️" title="Aprovações" />{[['Estratégia Aprovada', 'estrategiaAprovada'], ['Identidade Visual', 'identidadeAprovada'], ['Cronograma', 'cronogramaAprovado']].map(([l, k]) => (<div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: `1px solid ${C.border}` }}><span style={{ fontSize: 13, fontWeight: 600 }}>{l}</span><span style={{ fontSize: 22 }}>{sel.onboarding[k] ? '✅' : '❌'}</span></div>))}</Card>
            </div>}

            {cTab === 'operacional' && <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
                {[['Tema do Mês', sel.operacional.temaMes], ['Campanha', sel.operacional.campanha], ['Objetivo', sel.operacional.objetivoMes]].map(([l, v]) => (<Card key={l} style={{ padding: 16 }}><div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.1em', fontWeight: 700, marginBottom: 6 }}>{l.toUpperCase()}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{v || '—'}</div></Card>))}
              </div>
              <Card style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 22px 0' }}><SH icon="📅" title="Calendário Editorial" /></div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: 'rgba(168,85,247,0.08)', borderBottom: `1px solid ${C.border}` }}>{['Conteúdo', 'Formato', 'Data', 'Responsável', 'Status', '✓'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 9, fontFamily: "'Syne', sans-serif", letterSpacing: '0.12em', color: C.g2 }}>{h.toUpperCase()}</th>)}</tr></thead>
                  <tbody>{sel.operacional.calendario.map(e => (<tr key={e.id} className="tr-hover" style={{ borderBottom: `1px solid ${C.border}` }}><td style={{ padding: '11px 16px', fontWeight: 600, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.conteudo}</td><td style={{ padding: '11px 16px' }}><span style={{ fontSize: 11, background: 'rgba(168,85,247,0.10)', color: C.p100, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{e.formato}</span></td><td style={{ padding: '11px 16px', color: C.g2 }}>{fmtD(e.data)}</td><td style={{ padding: '11px 16px', color: C.g2 }}>{e.responsavel}</td><td style={{ padding: '11px 16px' }}><span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, background: (CAL_C[e.status] || C.g2) + '1A', color: CAL_C[e.status] || C.g2 }}>{e.status}</span></td><td style={{ padding: '11px 16px', fontSize: 18 }}>{e.aprovado ? '✅' : '⏳'}</td></tr>))}</tbody>
                </table>
                {sel.operacional.calendario.length === 0 && <div style={{ color: C.g2, textAlign: 'center', padding: 24, fontSize: 13 }}>Nenhum conteúdo.</div>}
              </Card>
            </div>}

            {cTab === 'trafego' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card><SH icon="💜" title="Performance META" /><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{[['CPM', sel.trafego.meta?.cpm], ['CTR', sel.trafego.meta?.ctr], ['CPC', sel.trafego.meta?.cpc], ['Leads', sel.trafego.meta?.leads], ['CPL', sel.trafego.meta?.cpl], ['Frequência', sel.trafego.meta?.frequencia]].map(([l, v]) => (<div key={l} style={{ background: C.bg3, borderRadius: 10, padding: 12, textAlign: 'center', border: `1px solid ${C.border}` }}><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 20, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v || '—'}</div><div style={{ fontSize: 10, color: C.g2, fontWeight: 700, letterSpacing: '0.08em', marginTop: 3 }}>{l}</div></div>))}</div></Card>
              <Card><SH icon="🔵" title="Performance GOOGLE" /><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{[['Impressões', sel.trafego.google?.impressoes], ['Cliques', sel.trafego.google?.cliques], ['Conversões', sel.trafego.google?.conversoes], ['CPA', sel.trafego.google?.cpa], ['Qualidade', sel.trafego.google?.qualidade + '/10']].map(([l, v]) => (<div key={l} style={{ background: C.bg3, borderRadius: 10, padding: 12, textAlign: 'center', border: `1px solid ${C.border}` }}><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 20, color: '#60A5FA' }}>{v || '—'}</div><div style={{ fontSize: 10, color: C.g2, fontWeight: 700, letterSpacing: '0.08em', marginTop: 3 }}>{l}</div></div>))}</div></Card>
              <Card style={{ gridColumn: '1/-1' }}><SH icon="⚡" title="Histórico de Otimizações" />{(sel.trafego.otimizacoes || []).length === 0 ? <div style={{ color: C.g2, textAlign: 'center', padding: 20, fontSize: 13 }}>Nenhuma otimização.</div> : (sel.trafego.otimizacoes || []).map((o, i) => (<div key={i} style={{ display: 'flex', gap: 14, padding: '11px 14px', background: C.bg3, borderRadius: 10, marginBottom: 8, border: `1px solid ${C.border}` }}><span style={{ fontSize: 12, color: C.g2, minWidth: 78 }}>{fmtD(o.data)}</span><div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{o.alteracao}</div><div style={{ fontSize: 12, color: C.green, marginTop: 3, fontWeight: 700 }}>↑ {o.resultado}</div></div></div>))}</Card>
            </div>}

            {cTab === 'videosIA' && <div>{sel.videosIA.length === 0 ? <Card><div style={{ color: C.g2, textAlign: 'center', padding: 40, fontSize: 14 }}>🎬 Nenhum vídeo IA cadastrado.</div></Card> : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(275px,1fr))', gap: 14 }}>{sel.videosIA.map(v => (<Card key={v.id} glow={C.k100}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}><span style={{ fontSize: 30 }}>🎬</span><Badge label={v.status} bg={v.status === 'Aprovado' ? 'rgba(52,211,153,0.10)' : 'rgba(168,85,247,0.10)'} color={v.status === 'Aprovado' ? C.green : C.p100} /></div>{[['Objetivo', v.objetivo], ['Avatar/Voz', v.avatar], ['Plataforma', v.plataforma]].map(([l, val]) => <IB key={l} label={l} value={val} />)}<div style={{ marginTop: 12, display: 'flex', gap: 10 }}><div style={{ textAlign: 'center', flex: 1 }}><div style={{ fontSize: 18 }}>{v.entregue ? '✅' : '⏳'}</div><div style={{ fontSize: 9, color: C.g2, fontWeight: 700, marginTop: 2 }}>ENTREGUE</div></div><div style={{ textAlign: 'center', flex: 1 }}><div style={{ fontSize: 18 }}>{v.aprovado ? '✅' : '⏳'}</div><div style={{ fontSize: 9, color: C.g2, fontWeight: 700, marginTop: 2 }}>APROVADO</div></div></div><div style={{ marginTop: 12, background: C.bg3, borderRadius: 8, padding: 10, fontSize: 11, color: C.g1, lineHeight: 1.55, border: `1px solid ${C.border}` }}><strong style={{ color: C.p100 }}>Roteiro:</strong> {v.roteiro}</div></Card>))}</div>}</div>}

            {cTab === 'financeiro' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card><SH icon="💳" title="Contrato Financeiro" />{[['Valor Mensal', fmt(sel.financeiro.valorMensal)], ['Pagamento', sel.financeiro.formaPagamento], ['Vencimento', 'Dia ' + sel.financeiro.diaVencimento], ['LTV', fmt(sel.financeiro.ltv)], ['Margem', sel.financeiro.margem]].map(([l, v]) => (<div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}><span style={{ fontSize: 12, color: C.g2, fontWeight: 600 }}>{l}</span><span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 16, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</span></div>))}</Card>
              <Card><SH icon="📊" title="Resumo" /><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{[{ l: 'Recebido', v: fmt(sel.financeiro.pagamentos.filter(p => p.status === 'pago').reduce((s, p) => s + p.valor, 0)), c: C.green }, { l: 'Em Aberto', v: fmt(sel.financeiro.pagamentos.filter(p => p.status === 'pendente').reduce((s, p) => s + p.valor, 0)), c: C.yellow }, { l: 'Atrasado', v: fmt(sel.financeiro.pagamentos.filter(p => p.status === 'atrasado').reduce((s, p) => s + p.valor, 0)), c: C.red }, { l: 'Total Pgtos', v: sel.financeiro.pagamentos.length, c: C.p100 }].map(x => (<div key={x.l} style={{ background: C.bg3, borderRadius: 10, padding: 12, textAlign: 'center', border: `1px solid ${C.border}` }}><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 19, color: x.c }}>{x.v}</div><div style={{ fontSize: 9, color: C.g2, fontWeight: 700, letterSpacing: '0.1em', marginTop: 3 }}>{x.l.toUpperCase()}</div></div>))}</div></Card>
              <Card style={{ gridColumn: '1/-1' }}><SH icon="📜" title="Histórico de Pagamentos" />{[...sel.financeiro.pagamentos].sort((a, b) => b.mes.localeCompare(a.mes)).map(p => (<div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 14px', background: C.bg3, borderRadius: 10, marginBottom: 8, border: `1px solid ${C.border}` }}><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{mon(p.mes.split('-')[1])} {p.mes.split('-')[0]}</div><div style={{ fontSize: 11, color: C.g2, marginTop: 2 }}>{p.pago ? `Pago ${fmtD(p.pago)}` : 'Aguardando'}</div></div><Badge label={PAY_B[p.status]?.label} bg={PAY_B[p.status]?.bg} color={PAY_B[p.status]?.color} /><span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 17, minWidth: 78, textAlign: 'right' }}>{fmt(p.valor)}</span>{p.status !== 'pago' && <GBtn variant="success" small onClick={() => markPaid(sel.id, p.id)}>✓ Pago</GBtn>}</div>))}{sel.financeiro.pagamentos.length === 0 && <div style={{ color: C.g2, textAlign: 'center', padding: 24, fontSize: 13 }}>Nenhum pagamento.</div>}</Card>
            </div>}

            {cTab === 'relacionamento' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card><SH icon="❤️" title="Saúde da Conta" /><div style={{ textAlign: 'center', padding: '18px 0' }}><div style={{ fontSize: 54 }}>{sel.relacionamento.saudeClassificacao === 'saudavel' ? '🟢' : sel.relacionamento.saudeClassificacao === 'atencao' ? '🟡' : '🔴'}</div><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 20, marginTop: 10 }}>{SAUDE[sel.relacionamento.saudeClassificacao]?.label}</div></div><div style={{ background: C.bg3, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${C.border}`, marginTop: 8 }}><div style={{ fontSize: 9, color: C.g2, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 6 }}>SATISFAÇÃO (NPS)</div><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 48, color: sel.relacionamento.satisfacao >= 8 ? C.green : sel.relacionamento.satisfacao >= 6 ? C.yellow : C.red }}>{sel.relacionamento.satisfacao}<span style={{ fontSize: 18, color: C.g2 }}>/10</span></div></div></Card>
              <Card><SH icon="📝" title="Feedbacks" />{sel.relacionamento.feedback.length === 0 ? <div style={{ color: C.g2, textAlign: 'center', padding: 24, fontSize: 13 }}>Nenhum feedback.</div> : sel.relacionamento.feedback.map(f => (<div key={f.id} style={{ background: C.bg3, borderRadius: 10, padding: '12px 14px', marginBottom: 10, border: `1px solid ${C.border}` }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ fontSize: 11, color: C.g2 }}>{fmtD(f.data)}</span><span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 16, color: f.nota >= 8 ? C.green : f.nota >= 6 ? C.yellow : C.red }}>{f.nota}/10</span></div><div style={{ fontSize: 13, color: C.g1, lineHeight: 1.5 }}>{f.comentario}</div></div>))}</Card>
              <Card style={{ gridColumn: '1/-1' }}><SH icon="🤝" title="Reuniões" />{sel.relacionamento.reunioes.length === 0 ? <div style={{ color: C.g2, textAlign: 'center', padding: 20, fontSize: 13 }}>Nenhuma reunião.</div> : sel.relacionamento.reunioes.map(r => (<div key={r.id} style={{ display: 'flex', gap: 16, padding: '14px 16px', background: C.bg3, borderRadius: 12, marginBottom: 10, border: `1px solid ${C.border}` }}><div style={{ textAlign: 'center', minWidth: 52 }}><div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 24, background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{r.data?.split('-')[2]}</div><div style={{ fontSize: 10, color: C.g2, fontWeight: 700 }}>{mon(r.data?.split('-')[1])?.toUpperCase()}</div></div><div style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 16, flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{r.assuntos}</div>{r.pendencias && <div style={{ fontSize: 12, color: C.yellow, fontWeight: 700 }}>⚡ {r.pendencias}</div>}</div></div>))}</Card>
            </div>}
          </div>
        )}
      </main>

      {/* MODAL NOVO CLIENTE */}
      {modal === 'newClient' && (
        <Modal title="NOVO CLIENTE" onClose={() => setModal(null)} wide>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 18px' }}>
            <Fld label="Nome da Empresa *" value={nc.empresa} onChange={e => setNC(p => ({ ...p, empresa: e.target.value }))} placeholder="Ex: Empresa ABC" />
            <Fld label="Responsável *" value={nc.responsavel} onChange={e => setNC(p => ({ ...p, responsavel: e.target.value }))} />
            <Fld label="Cargo" value={nc.cargo} onChange={e => setNC(p => ({ ...p, cargo: e.target.value }))} />
            <Fld label="WhatsApp" value={nc.whatsapp} onChange={e => setNC(p => ({ ...p, whatsapp: e.target.value }))} />
            <Fld label="E-mail" type="email" value={nc.email} onChange={e => setNC(p => ({ ...p, email: e.target.value }))} />
            <Fld label="CNPJ" value={nc.cnpj} onChange={e => setNC(p => ({ ...p, cnpj: e.target.value }))} />
            <Fld label="Segmento" value={nc.segmento} onChange={e => setNC(p => ({ ...p, segmento: e.target.value }))} />
            <Fld label="Cidade" value={nc.cidade} onChange={e => setNC(p => ({ ...p, cidade: e.target.value }))} />
            <Fld label="Site" value={nc.site} onChange={e => setNC(p => ({ ...p, site: e.target.value }))} />
            <Fld label="Mensalidade (R$)" type="number" value={nc.valorMensal} onChange={e => setNC(p => ({ ...p, valorMensal: e.target.value }))} />
            <Fld label="Dia Vencimento" type="number" min="1" max="28" value={nc.diaVencimento} onChange={e => setNC(p => ({ ...p, diaVencimento: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: C.g2, letterSpacing: '0.1em', fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>SERVIÇOS CONTRATADOS</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Social Media', 'Tráfego Pago', 'Vídeos IA', 'Captação', 'Consultoria', 'Estratégia'].map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', background: nc.servicos.includes(s) ? C.grad : 'rgba(168,85,247,0.08)', color: nc.servicos.includes(s) ? '#fff' : C.g2, padding: '6px 12px', borderRadius: 9, transition: 'all .15s', border: `1px solid ${nc.servicos.includes(s) ? 'transparent' : C.border}` }}>
                  <input type="checkbox" checked={nc.servicos.includes(s)} onChange={e => setNC(p => ({ ...p, servicos: e.target.checked ? [...p.servicos, s] : p.servicos.filter(x => x !== s) }))} style={{ display: 'none' }} />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 10, color: C.g2, letterSpacing: '0.1em', fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>COR IDENTIFICADORA</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CHIP_COLORS.map(col => <div key={col} onClick={() => setNC(p => ({ ...p, color: col }))} style={{ width: 28, height: 28, borderRadius: '50%', background: col, cursor: 'pointer', border: nc.color === col ? '3px solid #fff' : '3px solid transparent', boxShadow: nc.color === col ? `0 0 12px ${col}` : 'none', transition: 'all .15s' }} />)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <GBtn onClick={addClient} full disabled={!nc.empresa || !nc.responsavel}>🚀 CADASTRAR CLIENTE</GBtn>
            <GBtn variant="ghost" onClick={() => setModal(null)}>Cancelar</GBtn>
          </div>
        </Modal>
      )}
    </div>
  )
}
