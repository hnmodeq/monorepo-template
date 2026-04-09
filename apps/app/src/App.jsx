import { useAuth } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { Button } from 'ui';

function App() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome back!</h1>
        <p className="mt-2 text-neutral-500">
          Logged in as <span className="font-medium text-neutral-900">{user.email}</span>
        </p>
      </div>
      <Button onClick={logout} variant="outline" className="mt-4">
        Sign out
      </Button>
    </div>
  );
}

export default App;
