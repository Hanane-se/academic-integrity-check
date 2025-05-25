import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, BookOpen, Users, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  if (showLogin) {
    return <LoginForm onBack={() => setShowLogin(false)} onRegister={() => { setShowLogin(false); setShowRegister(true); }} />;
  }

  if (showRegister) {
    return <RegisterForm onBack={() => setShowRegister(false)} onLogin={() => { setShowRegister(false); setShowLogin(true); }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/82140450-3eda-4593-9dfd-59097e36d4fe.png" alt="EduCheck Logo" className="h-16 w-auto" />
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/demo')}>
                Démonstration
              </Button>
              <Button variant="outline" onClick={() => setShowLogin(true)}>
                Se connecter
              </Button>
              <Button onClick={() => setShowRegister(true)}>
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img src="/lovable-uploads/82140450-3eda-4593-9dfd-59097e36d4fe.png" alt="EduCheck Logo" className="h-32 w-auto mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Garantissez l'intégrité académique
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            EduCheck utilise l'IA avancée et la surveillance en temps réel pour prévenir la triche 
            et maintenir l'équité dans vos examens en ligne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setShowRegister(true)} className="px-8 py-3">
              Commencer maintenant
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => navigate('/demo')}>
              Voir la démonstration
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Fonctionnalités avancées
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Anti-triche</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Surveillance en temps réel avec détection de changement de fenêtre et blocage du copier-coller
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Détection de plagiat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analyse vectorielle Chroma pour détecter le contenu copié depuis des ressources en ligne
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">IA Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Chatbot IA utilisant Mistral pour fournir des commentaires personnalisés sur les réponses
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Gestion complète</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tableau de bord pour professeurs avec rapports détaillés et gestion des étudiants
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Sécurité maximale
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-3">Surveillance en temps réel</h3>
              <p className="text-gray-600">
                Détection automatique des tentatives de triche avec fermeture de session immédiate
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-3">Rapports automatiques</h3>
              <p className="text-gray-600">
                Notifications instantanées aux professeurs en cas de comportement suspect
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-3">Blocage permanent</h3>
              <p className="text-gray-600">
                Les étudiants pris en flagrant délit perdent définitivement l'accès à l'examen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/lovable-uploads/82140450-3eda-4593-9dfd-59097e36d4fe.png" alt="EduCheck Logo" className="h-16 w-auto" />
          </div>
          <p className="text-gray-400">
            © 2024 EduCheck. Tous droits réservés. Plateforme sécurisée pour l'intégrité académique.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
