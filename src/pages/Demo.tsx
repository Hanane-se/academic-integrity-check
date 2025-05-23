
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExamInterface from '@/components/exam/ExamInterface';
import PlagiarismDetector from '@/components/plagiarism/PlagiarismDetector';
import FeedbackChatbot from '@/components/ai/FeedbackChatbot';
import { ArrowLeft } from 'lucide-react';

const Demo = () => {
  const [showExam, setShowExam] = useState(false);
  
  const mockQuestions = [
    {
      id: 1,
      type: 'mcq' as const,
      question: "Quelle est la capitale de la France ?",
      options: ["Londres", "Paris", "Berlin", "Madrid"]
    },
    {
      id: 2,
      type: 'text' as const,
      question: "Expliquez les principes de base de l'intelligence artificielle."
    },
    {
      id: 3,
      type: 'mcq' as const,
      question: "Quel est le langage de programmation principal pour le web ?",
      options: ["Python", "Java", "JavaScript", "C++"]
    }
  ];

  const mockAnswers = {
    1: "Paris",
    2: "L'intelligence artificielle est une technologie qui permet aux machines d'apprendre et de prendre des décisions comme les humains...",
    3: "JavaScript"
  };

  const sampleText = "L'intelligence artificielle (IA) est une technologie en pleine expansion qui révolutionne notre façon de travailler et de vivre. Elle permet aux machines d'apprendre, de raisonner et de prendre des décisions de manière autonome. Les applications de l'IA sont nombreuses et touchent tous les secteurs d'activité.";

  if (showExam) {
    return <ExamInterface examTitle="Examen de démonstration" questions={mockQuestions} duration={60} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="text-blue-300 hover:text-blue-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>

        <div className="text-center mb-8">
          <img src="/lovable-uploads/82140450-3eda-4593-9dfd-59097e36d4fe.png" alt="EduCheck Logo" className="h-24 w-auto mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Démonstration EduCheck</h1>
          <p className="text-blue-200">Explorez toutes les fonctionnalités de notre plateforme d'intégrité académique</p>
        </div>

        <Tabs defaultValue="exam" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/30 text-white">
            <TabsTrigger value="exam" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">Interface d'examen</TabsTrigger>
            <TabsTrigger value="plagiarism" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">Détection de plagiat</TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">Chatbot IA</TabsTrigger>
          </TabsList>

          <TabsContent value="exam" className="space-y-4">
            <Card className="bg-white border-blue-800">
              <CardHeader>
                <CardTitle>Interface d'examen sécurisée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Testez notre interface d'examen avec surveillance en temps réel, détection de changement de fenêtre,
                  et blocage du copier-coller pour les QCM.
                </p>
                <Button onClick={() => setShowExam(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Commencer l'examen de démonstration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plagiarism" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border-blue-800">
                <CardHeader>
                  <CardTitle>À propos de la détection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Notre système utilise des vecteurs Chroma pour analyser la similarité entre les réponses 
                    des étudiants et les ressources en ligne existantes.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Analyse vectorielle avancée</li>
                    <li>• Comparaison avec millions de sources</li>
                    <li>• Score de similarité précis</li>
                    <li>• Détection en temps réel</li>
                  </ul>
                </CardContent>
              </Card>
              
              <PlagiarismDetector 
                text={sampleText}
                onResult={(result) => console.log('Résultat plagiat:', result)}
              />
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border-blue-800">
                <CardHeader>
                  <CardTitle>Chatbot IA Mistral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Notre assistant IA utilise le modèle Mistral pour analyser les réponses des étudiants 
                    et fournir des commentaires personnalisés et constructifs.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Feedback personnalisé</li>
                    <li>• Analyse contextuelle</li>
                    <li>• Suggestions d'amélioration</li>
                    <li>• Interaction en temps réel</li>
                  </ul>
                </CardContent>
              </Card>
              
              <FeedbackChatbot 
                studentAnswers={mockAnswers}
                examTitle="Examen de démonstration"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Demo;
