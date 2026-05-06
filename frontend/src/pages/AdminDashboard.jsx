import {
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FileText,
  FolderKanban,
  Home,
  Inbox,
  LogIn,
  LogOut,
  MessageSquareText,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
} from 'lucide-react';
import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL, deleteJson, getJson, postForm, putJson } from '../api.js';

const emptyEmployee = {
  full_name: '',
  role: '',
  department: 'LABOUR',
  phone: '',
  email: '',
  bio: '',
};

const emptyProject = {
  title: '',
  description: '',
  location: '',
  client_name: '',
  status: 'PLANNING',
  estimated_value: '',
};

const emptyPayment = {
  customer_name: '',
  phone: '',
  email: '',
  amount: '',
  currency: 'USD',
  method: 'ECOCASH',
};

// Admin page that connects the frontend to the separated Django backend apps.
function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [status, setStatus] = useState('');
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [employeeForm, setEmployeeForm] = useState(emptyEmployee);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [paymentForm, setPaymentForm] = useState(emptyPayment);

  const stats = useMemo(
    () => [
      ['Employees', employees.length, UsersRound],
      ['Projects', projects.length, FolderKanban],
      ['Messages', messages.length, Inbox],
      ['Quotes', quotes.length, MessageSquareText],
    ],
    [employees.length, messages.length, projects.length, quotes.length]
  );

  useEffect(() => {
    loadPublicData();
    loadSession();
  }, []);

  async function loadPublicData() {
    const [employeeData, projectData, optionsData] = await Promise.all([
      getJson('/api/employees/'),
      getJson('/api/projects/'),
      getJson('/api/payments/options/'),
    ]);
    setEmployees(employeeData.employees || []);
    setProjects(projectData.projects || []);
    setPaymentOptions(optionsData.methods || []);
  }

  async function loadSession() {
    const data = await getJson('/api/auth/me/');
    if (data.authenticated) {
      setUser(data.user);
      await loadAdminData();
    }
  }

  async function loadAdminData() {
    try {
      const [messageData, quoteData] = await Promise.all([
        getJson('/api/admin/messages/'),
        getJson('/api/admin/quotes/'),
      ]);
      setMessages(messageData.messages || []);
      setQuotes(quoteData.quotes || []);
    } catch {
      setMessages([]);
      setQuotes([]);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setStatus('Logging in...');
    try {
      const response = await postJsonCompat('/api/auth/login/', loginForm);
      setUser(response.user);
      setLoginForm({ username: '', password: '' });
      await loadAdminData();
      setStatus('Logged in successfully.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function createEmployee(event) {
    event.preventDefault();
    setStatus('Creating employee...');
    const formData = new FormData(event.currentTarget);
    try {
      await postForm('/api/employees/', formData);
      event.currentTarget.reset();
      setEmployeeForm(emptyEmployee);
      await loadPublicData();
      setStatus('Employee created.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function createProject(event) {
    event.preventDefault();
    setStatus('Creating project...');
    const formData = new FormData(event.currentTarget);
    try {
      await postForm('/api/projects/', formData);
      event.currentTarget.reset();
      setProjectForm(emptyProject);
      await loadPublicData();
      setStatus('Project created.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function createPayment(event) {
    event.preventDefault();
    setStatus('Creating payment request...');
    try {
      await postJsonCompat('/api/payments/initiate/', paymentForm);
      setPaymentForm(emptyPayment);
      setStatus('Payment request recorded.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function updateMessage(id, statusValue) {
    await putJson('/api/admin/messages/', { id, status: statusValue });
    await loadAdminData();
  }

  async function updateQuote(id, statusValue) {
    await putJson('/api/admin/quotes/', { id, status: statusValue });
    await loadAdminData();
  }

  async function removeEmployee(id) {
    await deleteJson(`/api/employees/${id}/`);
    await loadPublicData();
  }

  async function removeProject(id) {
    await deleteJson(`/api/projects/${id}/`);
    await loadPublicData();
  }

  async function handleLogout() {
    await postJsonCompat('/api/auth/logout/', {});
    setUser(null);
    setMessages([]);
    setQuotes([]);
    setStatus('Logged out.');
  }

  if (!user) {
    return (
      <section className="section admin-page">
        <div className="section-inner">
          <div className="admin-heading reveal">
            <p className="eyebrow">Backend Admin</p>
            <h1>Tandari operations dashboard</h1>
            <p>Login to manage employees, projects, customer messages, quote requests, and payment records.</p>
          </div>

          {status && <p className="admin-status">{status}</p>}

          <form className="admin-login form-card reveal" onSubmit={handleLogin}>
            <LogIn size={28} />
            <h2>Admin Login</h2>
            <label>
              Username
              <input
                value={loginForm.username}
                onChange={(event) => setLoginForm({ ...loginForm, username: event.target.value })}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                required
              />
            </label>
            <button className="button primary" type="submit">
              Login <LogIn size={18} />
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-console">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Building2 size={34} />
          <span>Tandari Admin</span>
        </div>
        <nav className="admin-menu" aria-label="Admin navigation">
          <a className="active" href="#dashboard"><Home size={22} /> Home</a>
          <a href="#employees"><UsersRound size={22} /> Employees</a>
          <a href="#projects"><FolderKanban size={22} /> Projects</a>
          <a href="#messages"><Inbox size={22} /> Messages</a>
          <a href="#quotes"><FileText size={22} /> Quotes</a>
          <a href="#payments"><CreditCard size={22} /> Payments</a>
        </nav>
        <div className="admin-side-section">
          <span>Site Administration</span>
          <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noreferrer"><ShieldCheck size={21} /> Django Admin</a>
          <button type="button" onClick={handleLogout}><LogOut size={21} /> Log out</button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-top-icon"><Building2 size={54} /></div>
          <div className="admin-top-actions">
            <span>Welcome, <strong>{user?.username || 'admin'}</strong></span>
            <a href="/">View site</a>
            {user && <button type="button" onClick={handleLogout}>Log out</button>}
          </div>
        </header>

        <div className="admin-content" id="dashboard">
          {status && <p className="admin-status">{status}</p>}

          <div className="admin-stat-row">
            {stats.map(([label, value, Icon]) => (
              <article className="admin-mini-stat" key={label}>
                <Icon size={23} />
                <span>{label}</span>
                <strong>{value}</strong>
              </article>
            ))}
          </div>

          <div className="admin-card-grid">
                <AdminPanel title="Employees" icon={UsersRound} id="employees">
                  <AdminToolbar filters={['Filter by Department', 'Filter by Status']} />
                  <form className="admin-inline-form" onSubmit={createEmployee}>
                    <input name="full_name" placeholder="Full name" required />
                    <input name="role" placeholder="Role" required />
                    <select name="department" defaultValue={employeeForm.department}>
                      <option value="MANAGEMENT">Management</option>
                      <option value="SALES">Sales</option>
                      <option value="FOREMAN">Site Foreman</option>
                      <option value="ADMIN">Administration</option>
                      <option value="LABOUR">Labour</option>
                    </select>
                    <input name="photo" type="file" accept="image/*" />
                    <button className="admin-add-button" type="submit"><Plus size={18} /> Add</button>
                  </form>
                  <AdminTable
                    columns={['ID', 'Name', 'Role', 'Department', 'Status', '']}
                    rows={employees.map((employee) => [
                      employee.id,
                      employee.full_name,
                      employee.role,
                      employee.department,
                      employee.is_active ? 'Active' : 'Inactive',
                      <DeleteButton onClick={() => removeEmployee(employee.id)} />,
                    ])}
                  />
                </AdminPanel>

                <AdminPanel title="Projects" icon={FolderKanban} id="projects">
                  <AdminToolbar filters={['Filter by Status']} />
                  <form className="admin-inline-form" onSubmit={createProject}>
                    <input name="title" placeholder="Project title" required />
                    <input name="location" placeholder="Location" />
                    <select name="status" defaultValue={projectForm.status}>
                      <option value="PLANNING">Planning</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="ON_HOLD">On Hold</option>
                    </select>
                    <input name="cover_image" type="file" accept="image/*" />
                    <textarea name="description" rows="2" placeholder="Description" required />
                    <button className="admin-add-button" type="submit"><Plus size={18} /> Add</button>
                  </form>
                  <AdminTable
                    columns={['ID', 'Project', 'Location', 'Status', 'Value', '']}
                    rows={projects.map((project) => [
                      project.id,
                      project.title,
                      project.location || '-',
                      project.status,
                      project.estimated_value || '-',
                      <DeleteButton onClick={() => removeProject(project.id)} />,
                    ])}
                  />
                </AdminPanel>

                <AdminPanel title="Messages" icon={Inbox} id="messages">
                  <AdminTable
                    columns={['ID', 'Name', 'Email', 'Message', 'Status']}
                    rows={messages.map((message) => [
                      message.id,
                      message.name,
                      message.email,
                      message.message,
                      <StatusSelect value={message.status} options={['NEW', 'READ', 'REPLIED', 'ARCHIVED']} onChange={(value) => updateMessage(message.id, value)} />,
                    ])}
                    emptyText="Login to view messages."
                  />
                </AdminPanel>

                <AdminPanel title="Quote Requests" icon={BriefcaseBusiness} id="quotes">
                  <AdminTable
                    columns={['ID', 'Name', 'Phone', 'Project Type', 'Status']}
                    rows={quotes.map((quote) => [
                      quote.id,
                      quote.name,
                      quote.phone,
                      quote.project_type,
                      <StatusSelect value={quote.status} options={['NEW', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'DECLINED']} onChange={(value) => updateQuote(quote.id, value)} />,
                    ])}
                    emptyText="Login to view quotes."
                  />
                </AdminPanel>

                <AdminPanel title="Payment Request" icon={CreditCard} id="payments">
                  <form className="admin-payment-form" onSubmit={createPayment}>
                    <input placeholder="Customer name" value={paymentForm.customer_name} onChange={(event) => setPaymentForm({ ...paymentForm, customer_name: event.target.value })} required />
                    <input placeholder="Phone" value={paymentForm.phone} onChange={(event) => setPaymentForm({ ...paymentForm, phone: event.target.value })} />
                    <input placeholder="Amount" value={paymentForm.amount} onChange={(event) => setPaymentForm({ ...paymentForm, amount: event.target.value })} required />
                    <select value={paymentForm.method} onChange={(event) => setPaymentForm({ ...paymentForm, method: event.target.value })}>
                      {paymentOptions.map((option) => <option value={option.code} key={option.code}>{option.label}</option>)}
                    </select>
                    <button className="admin-add-button" type="submit"><Plus size={18} /> Add</button>
                  </form>
                  <p className="admin-note">Transactions are recorded as pending until EcoCash/card credentials are connected.</p>
                </AdminPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminPanel({ title, icon: Icon, id, children }) {
  return (
    <article className="admin-screen-card reveal" id={id}>
      <header>
        <h2><Icon size={22} /> {title}</h2>
        <button type="button" className="admin-add-button"><Plus size={18} /> Add</button>
      </header>
      {children}
    </article>
  );
}

function AdminToolbar({ filters = [] }) {
  return (
    <div className="admin-toolbar">
      <label>
        <input placeholder="Search..." />
        <Search size={19} />
      </label>
      {filters.map((filter) => (
        <select key={filter} defaultValue="">
          <option value="" disabled>{filter}</option>
        </select>
      ))}
    </div>
  );
}

function AdminTable({ columns, rows, emptyText = 'No records yet.' }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="admin-empty">{emptyText}</p>}
    </div>
  );
}

function StatusSelect({ value, options, onChange }) {
  return (
    <select className="admin-status-select" value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
  );
}

function DeleteButton({ onClick }) {
  return (
    <button className="admin-delete-button" type="button" onClick={onClick}>
      <RefreshCw size={16} /> Delete
    </button>
  );
}

async function postJsonCompat(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Request failed.');
  }
  return data;
}

export default AdminDashboard;
