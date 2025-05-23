
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header */}
      <header className="bg-black shadow-sm border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/82140450-3eda-4593-9dfd-59097e36d4fe.png" alt="EduCheck Logo" className="h-16 w-auto" />
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/demo')} className="text-white border-blue-500 hover:bg-blue-800">
                Démonstration
              </Button>
              <Button variant="outline" onClick={() => setShowLogin(true)} className="text-white border-blue-500 hover:bg-blue-800">
                Se connecter
              </Button>
              <Button onClick={() => setShowRegister(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Garantissez l'intégrité académique
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            EduCheck utilise l'IA avancée et la surveillance en temps réel pour prévenir la triche 
            et maintenir l'équité dans vos examens en ligne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setShowRegister(true)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white">
              Commencer maintenant
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 border-blue-500 text-white hover:bg-blue-800" onClick={() => navigate('/demo')}>
              Voir la démonstration
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Fonctionnalités avancées
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-blue-200">
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

            <Card className="text-center hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Détection de plagiat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analyse vectorielle Chroma pour détecter le contenu copié depuis des ressources en ligne
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">IA Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Chatbot IA utilisant Mistral pour fournir des commentaires personnalisés sur les réponses
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
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
          <h2 className="text-3xl font-bold text-black mb-8">
            Sécurité maximale
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border-blue-100">
              <h3 className="font-semibold text-lg mb-3">Surveillance en temps réel</h3>
              <p className="text-gray-600">
                Détection automatique des tentatives de triche avec fermeture de session immédiate
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-blue-100">
              <h3 className="font-semibold text-lg mb-3">Rapports automatiques</h3>
              <p className="text-gray-600">
                Notifications instantanées aux professeurs en cas de comportement suspect
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-blue-100">
              <h3 className="font-semibold text-lg mb-3">Blocage permanent</h3>
              <p className="text-gray-600">
                Les étudiants pris en flagrant délit perdent définitivement l'accès à l'examen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/lovable-uploads/82140450-3eda-4593-9dfd-59097e36d4fe.png" alt="EduCheck Logo" className="h-12 w-auto" />
          </div>
          <p className="text-blue-300">
            © 2024 EduCheck. Tous droits réservés. Plateforme sécurisée pour l'intégrité académique.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
