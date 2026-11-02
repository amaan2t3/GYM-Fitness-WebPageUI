import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowLeft, BarChart3, Dumbbell, LogOut, Mail, Plus, Save, ShieldCheck, Trash2, Users, X } from 'lucide-react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const sections = {
  dashboard: { label: 'Overview', table: null },
  classes: { label: 'Classes', table: 'classes' },
  trainers: { label: 'Coaches', table: 'trainers' },
  membership_plans: { label: 'Membership', table: 'membership_plans' },
  inquiries: { label: 'Inquiries', table: 'inquiries' },
}

const editableFields = {
  classes: [
    { key: 'title', label: 'Class name', required: true },
    { key: 'category', label: 'Program section', type: 'select', options: [['mens', "Men's fitness"], ['ladies', "Ladies' fitness"], ['shared', 'All members']] },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'duration', label: 'Duration' },
    { key: 'intensity', label: 'Level' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'badge', label: 'Short label' },
    { key: 'image_url', label: 'Image URL', type: 'url' },
    { key: 'sort_order', label: 'Display order', type: 'number' },
    { key: 'is_active', label: 'Visible on website', type: 'checkbox' },
  ],
  trainers: [
    { key: 'name', label: 'Name', required: true },
    { key: 'role', label: 'Role' },
    { key: 'experience', label: 'Experience' },
    { key: 'bio', label: 'Biography', type: 'textarea' },
    { key: 'image_url', label: 'Image URL', type: 'url' },
    { key: 'instagram_url', label: 'Instagram URL', type: 'url' },
    { key: 'sort_order', label: 'Display order', type: 'number' },
    { key: 'is_active', label: 'Visible on website', type: 'checkbox' },
  ],
  membership_plans: [
    { key: 'name', label: 'Plan name', required: true },
    { key: 'price', label: 'Price (Rs.)', type: 'number', required: true },
    { key: 'period', label: 'Billing period' },
    { key: 'features', label: 'Features (one per line)', type: 'textarea' },
    { key: 'sort_order', label: 'Display order', type: 'number' },
    { key: 'is_highlighted', label: 'Highlight this plan', type: 'checkbox' },
    { key: 'is_active', label: 'Visible on website', type: 'checkbox' },
  ],
}

const emptyRecords = { classes: [], trainers: [], membership_plans: [], inquiries: [] }

function AdminLogin({ onLogin, error, busy }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submit(event) {
    event.preventDefault()
    onLogin(email, password)
  }

  return (
    <main className="admin-login-page">
      <a className="admin-back-link" href="/"><ArrowLeft size={16} /> Back to website</a>
      <form className="admin-login-card" onSubmit={submit}>
        <div className="admin-brand-icon"><ShieldCheck size={25} /></div>
        <span className="eyebrow">AMAAN’S / MANAGEMENT</span>
        <h1>Welcome back.</h1>
        <p>Sign in with your authorized administrator account.</p>
        <label>Email<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error && <p className="admin-alert" role="alert">{error}</p>}
        <button className="button button-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'} <ArrowLeft className="button-arrow" size={16} /></button>
        <span className="admin-login-note">Administrator access is invite-only.</span>
      </form>
    </main>
  )
}

function RecordEditor({ section, record, onClose, onSave, busy }) {
  const fields = editableFields[section]
  const [values, setValues] = useState(() => {
    const initial = {}
    fields.forEach(({ key, type }) => {
      const value = record?.[key]
      initial[key] = type === 'checkbox'
        ? Boolean(value)
        : key === 'features'
          ? (value || []).join('\n')
          : value ?? (key === 'sort_order' || key === 'price' ? 0 : key === 'category' ? 'mens' : '')
    })
    return initial
  })

  function submit(event) {
    event.preventDefault()
    const payload = { ...values }
    if (section === 'membership_plans') {
      payload.price = Number(payload.price)
      payload.features = payload.features.split('\n').map((feature) => feature.trim()).filter(Boolean)
    }
    if (Object.hasOwn(record || {}, 'id')) payload.id = record.id
    onSave(payload)
  }

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="admin-editor" onSubmit={submit}>
        <div className="admin-editor-heading"><div><span className="eyebrow">WEBSITE CONTENT</span><h2>{record ? 'Edit item' : 'Add new item'}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close"><X size={20} /></button></div>
        <div className="admin-editor-fields">
          {fields.map(({ key, label, type, required, options }) => (
            <label key={key} className={type === 'checkbox' ? 'admin-checkbox-field' : ''}>
              {type === 'checkbox' ? (
                <><input type="checkbox" checked={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.checked })} />{label}</>
              ) : (
                <>
                  {label}
                  {type === 'textarea'
                    ? <textarea rows={key === 'features' ? 5 : 3} required={required} value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })} />
                    : type === 'select'
                      ? <select required={required} value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })}>{options.map(([value, optionLabel]) => <option value={value} key={value}>{optionLabel}</option>)}</select>
                      : <input type={type || 'text'} min={type === 'number' ? 0 : undefined} required={required} value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })} />}
                </>
              )}
            </label>
          ))}
        </div>
        <div className="admin-editor-actions"><button type="button" className="button button-muted" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary" disabled={busy}><Save size={16} /> {busy ? 'Saving…' : 'Save changes'}</button></div>
      </form>
    </div>
  )
}

export default function AdminPortal() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [section, setSection] = useState('dashboard')
  const [records, setRecords] = useState(emptyRecords)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [editorRecord, setEditorRecord] = useState(undefined)
  const [editorOpen, setEditorOpen] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true)
      return undefined
    }
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError) setLoginError(sessionError.message)
      setSession(data?.session || null)
      setAuthReady(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })
    return () => subscription.unsubscribe()
  }, [])

  const loadRecords = useCallback(async () => {
    if (!session) return
    setError('')
    try {
      const { data: membership, error: membershipError } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle()
      if (membershipError) throw membershipError
      if (!membership) throw new Error('This signed-in account is not authorized to manage the website.')

      const results = await Promise.all(Object.entries(sections)
        .filter(([, value]) => value.table)
        .map(async ([key, value]) => {
          const orderColumn = key === 'inquiries' ? 'created_at' : 'sort_order'
          const query = supabase.from(value.table).select('*').order(orderColumn, { ascending: key !== 'inquiries' })
          const { data, error: requestError } = await query
          if (requestError) throw requestError
          return [key, data]
        }))
      setRecords(Object.fromEntries(results))
    } catch (requestError) {
      setError(requestError.message)
    }
  }, [session])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  const counts = useMemo(() => ({
    classes: records.classes.length,
    trainers: records.trainers.length,
    membership_plans: records.membership_plans.length,
    inquiries: records.inquiries.length,
    newInquiries: records.inquiries.filter((inquiry) => inquiry.status === 'new').length,
  }), [records])

  async function login(email, password) {
    setBusy(true)
    setLoginError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) setLoginError(authError.message)
    setBusy(false)
  }

  async function logout() {
    const { error: authError } = await supabase.auth.signOut()
    if (authError) setError(authError.message)
  }

  async function saveRecord(payload) {
    setBusy(true)
    setError('')
    const table = sections[section].table
    const { error: saveError } = await supabase.from(table).upsert(payload)
    if (saveError) {
      setError(saveError.message)
    } else {
      setEditorOpen(false)
      setNotice('Changes saved and published.')
      await loadRecords()
    }
    setBusy(false)
  }

  async function deleteRecord(record) {
    if (!window.confirm(`Delete "${record.title || record.name}"? This cannot be undone.`)) return
    setBusy(true)
    const { error: deleteError } = await supabase.from(sections[section].table).delete().eq('id', record.id)
    if (deleteError) setError(deleteError.message)
    else await loadRecords()
    setBusy(false)
  }

  async function updateInquiry(inquiry, status) {
    setBusy(true)
    const { error: updateError } = await supabase.from('inquiries').update({ status }).eq('id', inquiry.id)
    if (updateError) setError(updateError.message)
    else await loadRecords()
    setBusy(false)
  }

  async function deleteInquiry(inquiry) {
    if (!window.confirm(`Delete the inquiry from ${inquiry.name}? This cannot be undone.`)) return
    setBusy(true)
    const { error: deleteError } = await supabase.from('inquiries').delete().eq('id', inquiry.id)
    if (deleteError) setError(deleteError.message)
    else await loadRecords()
    setBusy(false)
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="admin-login-page">
        <a className="admin-back-link" href="/"><ArrowLeft size={16} /> Back to website</a>
        <section className="admin-login-card admin-setup-card">
          <div className="admin-brand-icon"><ShieldCheck size={25} /></div>
          <span className="eyebrow">ONE LAST SETUP</span>
          <h1>Connect Supabase.</h1>
          <p>Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your local <code>.env</code>, then run the SQL migrations in <code>backend/supabase/migrations</code>.</p>
          <a className="button button-primary" href="/">Return to website <ArrowLeft className="button-arrow" size={16} /></a>
        </section>
      </main>
    )
  }

  if (!authReady) return <main className="admin-loading">Loading admin portal…</main>
  if (!session) return <AdminLogin onLogin={login} error={loginError} busy={busy} />

  const currentSection = sections[section]
  const currentRecords = records[section] || []

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="brand admin-brand" href="/"><span className="brand-mark"><Dumbbell size={20} /></span><span>AMAAN’S<span className="brand-light"> / ADMIN</span></span></a>
        <span className="admin-side-label">WORKSPACE</span>
        <nav className="admin-side-nav" aria-label="Admin sections">
          {Object.entries(sections).map(([key, item]) => {
            const Icon = key === 'dashboard' ? BarChart3 : key === 'inquiries' ? Mail : key === 'trainers' ? Users : Dumbbell
            return <button key={key} className={section === key ? 'active' : ''} onClick={() => { setSection(key); setError(''); setNotice('') }}><Icon size={17} />{item.label}{key === 'inquiries' && counts.newInquiries > 0 && <span className="admin-nav-count">{counts.newInquiries}</span>}</button>
          })}
        </nav>
        <div className="admin-sidebar-bottom"><span className="admin-online-dot" /> Supabase connected<button onClick={logout}><LogOut size={16} /> Sign out</button></div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar"><div><span>AMAAN’S GYM & FITNESS</span><span className="admin-top-separator">/</span><strong>{currentSection.label}</strong></div><div className="admin-top-actions"><a href="/"><ArrowLeft size={15} /> View website</a><button type="button" onClick={logout}><LogOut size={15} /> Sign out</button></div></header>
        <section className="admin-content">
          <div className="admin-page-heading"><div><span className="eyebrow">MANAGEMENT CONSOLE</span><h1>{section === 'dashboard' ? 'Good to see you.' : currentSection.label}</h1><p>{section === 'dashboard' ? 'Here’s what’s happening at your studio.' : `Manage the ${currentSection.label.toLowerCase()} displayed on your website.`}</p></div>
            {editableFields[section] && <button className="button button-primary" onClick={() => { setEditorRecord(null); setEditorOpen(true) }}><Plus size={17} /> Add {section === 'membership_plans' ? 'plan' : section === 'trainers' ? 'coach' : 'class'}</button>}
          </div>

          {error && <p className="admin-alert" role="alert">{error}</p>}
          {notice && <p className="admin-notice" role="status">{notice}</p>}

          {section === 'dashboard' ? (
            <>
              <div className="admin-stat-grid">
                <div className="admin-stat-card"><span>Active classes</span><strong>{counts.classes}</strong><Dumbbell size={19} /></div>
                <div className="admin-stat-card"><span>Coaches</span><strong>{counts.trainers}</strong><Users size={19} /></div>
                <div className="admin-stat-card"><span>Membership plans</span><strong>{counts.membership_plans}</strong><BarChart3 size={19} /></div>
                <div className="admin-stat-card"><span>New inquiries</span><strong>{counts.newInquiries}</strong><Mail size={19} /></div>
              </div>
              <section className="admin-panel"><div className="admin-panel-heading"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Latest inquiries</h2></div><button className="admin-text-button" onClick={() => setSection('inquiries')}>All inquiries <ArrowLeft className="button-arrow" size={15} /></button></div>
                {records.inquiries.slice(0, 5).length ? <InquiryTable rows={records.inquiries.slice(0, 5)} onStatus={updateInquiry} onDelete={deleteInquiry} busy={busy} compact /> : <p className="admin-empty">No inquiries yet. New website messages will appear here.</p>}
              </section>
            </>
          ) : section === 'inquiries' ? (
            <section className="admin-panel">{currentRecords.length ? <InquiryTable rows={currentRecords} onStatus={updateInquiry} onDelete={deleteInquiry} busy={busy} /> : <p className="admin-empty">No inquiries received yet.</p>}</section>
          ) : (
            <section className="admin-panel admin-content-table">
              <div className="admin-table-heading"><span>{currentRecords.length} {currentRecords.length === 1 ? 'item' : 'items'}</span><button className="admin-refresh" onClick={() => loadRecords()} disabled={busy}>Refresh</button></div>
              {currentRecords.length ? <div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Status</th><th>Website order</th><th>Actions</th></tr></thead><tbody>
                {currentRecords.map((record) => <tr key={record.id}><td><strong>{record.title || record.name}</strong><small>{record.category ? `${record.category === 'mens' ? "Men's" : record.category === 'ladies' ? "Ladies'" : 'All members'} · ` : ''}{record.description || record.role || (record.features || []).join(' · ') || (record.price !== undefined ? `Rs. ${Number(record.price).toLocaleString()} / ${record.period}` : '')}</small></td><td><span className={`status-pill ${record.is_active ? 'status-live' : 'status-hidden'}`}>{record.is_active ? 'Published' : 'Hidden'}</span></td><td>{record.sort_order ?? '—'}</td><td><div className="admin-row-actions"><button onClick={() => { setEditorRecord(record); setEditorOpen(true) }}>Edit</button><button className="delete-action" disabled={busy} onClick={() => deleteRecord(record)}><Trash2 size={15} /> Delete</button></div></td></tr>)}
              </tbody></table></div> : <p className="admin-empty">Nothing here yet. Add your first item to publish it on the website.</p>}
            </section>
          )}
        </section>
      </div>

      {editorOpen && <RecordEditor section={section} record={editorRecord} busy={busy} onClose={() => setEditorOpen(false)} onSave={saveRecord} />}
    </main>
  )
}

function InquiryTable({ rows, onStatus, onDelete, busy, compact = false }) {
  return (
    <div className="admin-table-wrap"><table><thead><tr><th>Visitor</th><th>Message</th><th>Received</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      {rows.map((inquiry) => <tr key={inquiry.id}><td><strong>{inquiry.name}</strong><small>{inquiry.email}</small></td><td className="inquiry-message">{inquiry.message}</td><td>{new Date(inquiry.created_at).toLocaleDateString()}</td><td><select aria-label={`Status for ${inquiry.name}`} value={inquiry.status} disabled={busy} onChange={(event) => onStatus(inquiry, event.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></td><td><button className="icon-button delete-action" aria-label={`Delete inquiry from ${inquiry.name}`} disabled={busy} onClick={() => onDelete(inquiry)}><Trash2 size={16} /></button></td></tr>)}
    </tbody></table>{compact && <span className="sr-only">Showing the latest five inquiries.</span>}</div>
  )
}
