
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Clock, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExamInterfaceProps {
  examTitle: string;
  questions: Array<{
    id: number;
    type: 'mcq' | 'text';
    question: string;
    options?: string[];
  }>;
  duration: number; // in minutes
}

const ExamInterface = ({ examTitle, questions, duration }: ExamInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [windowFocused, setWindowFocused] = useState(true);
  const [violations, setViolations] = useState<string[]>([]);
  const [examTerminated, setExamTerminated] = useState(false);
  const { toast } = useToast();

  // Anti-cheating: Block copy/paste for MCQ
  const blockCopyPaste = useCallback((e: KeyboardEvent) => {
    if (questions[currentQuestion]?.type === 'mcq') {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
        e.preventDefault();
        const violation = `Tentative de copier-coller détectée à ${new Date().toLocaleTimeString()}`;
        setViolations(prev => [...prev, violation]);
        toast({
          title: "Action interdite",
          description: "Le copier-coller est désactivé pour les QCM",
          variant: "destructive"
        });
      }
    }
  }, [currentQuestion, questions, toast]);

  // Anti-cheating: Window focus detection
  const handleWindowFocus = useCallback(() => {
    setWindowFocused(true);
  }, []);

  const handleWindowBlur = useCallback(() => {
    setWindowFocused(false);
    const violation = `Changement de fenêtre détecté à ${new Date().toLocaleTimeString()}`;
    setViolations(prev => [...prev, violation]);
    
    // Terminate exam after 3 seconds of being unfocused
    setTimeout(() => {
      if (!document.hasFocus()) {
        setExamTerminated(true);
        toast({
          title: "Examen terminé",
          description: "Changement de fenêtre détecté. L'examen a été fermé automatiquement.",
          variant: "destructive"
        });
        // Send report to professor
        sendCheatingReport(violations);
      }
    }, 3000);
  }, [violations, toast]);

  const sendCheatingReport = (violationsList: string[]) => {
    console.log('Rapport de triche envoyé au professeur:', {
      student: 'Current Student',
      exam: examTitle,
      violations: violationsList,
      timestamp: new Date().toISOString()
    });
  };

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !examTerminated) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setExamTerminated(true);
      toast({
        title: "Temps écoulé",
        description: "L'examen s'est terminé automatiquement.",
      });
    }
  }, [timeLeft, examTerminated, toast]);

  // Setup event listeners
  useEffect(() => {
    document.addEventListener('keydown', blockCopyPaste);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('keydown', blockCopyPaste);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [blockCopyPaste, handleWindowFocus, handleWindowBlur]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (examTerminated) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-red-200">
          <CardHeader className="text-center">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-700">Examen terminé</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Votre session d'examen a été fermée en raison d'une violation des règles.
            </p>
            <p className="text-sm text-red-600 font-medium">
              Un rapport a été envoyé à votre professeur.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Security Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card className={`border-2 ${!windowFocused ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className={`h-5 w-5 ${windowFocused ? 'text-green-600' : 'text-red-600'}`} />
                <span className={`font-medium ${windowFocused ? 'text-green-700' : 'text-red-700'}`}>
                  {windowFocused ? 'Surveillance active' : 'ATTENTION: Fenêtre non focalisée'}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-mono text-lg font-bold text-blue-700">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exam Content */}
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{examTitle}</CardTitle>
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} sur {questions.length}
              </span>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {!windowFocused && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  Revenez sur cette fenêtre immédiatement. L'examen sera fermé automatiquement si vous restez ailleurs.
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-4">
                {questions[currentQuestion]?.question}
              </h3>

              {questions[currentQuestion]?.type === 'mcq' ? (
                <div className="space-y-3">
                  {questions[currentQuestion]?.options?.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded border hover:bg-gray-50">
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        checked={answers[currentQuestion] === option}
                        onChange={(e) => setAnswers(prev => ({...prev, [currentQuestion]: e.target.value}))}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  className="w-full h-32 p-3 border rounded-md resize-none"
                  placeholder="Saisissez votre réponse ici..."
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => setAnswers(prev => ({...prev, [currentQuestion]: e.target.value}))}
                />
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Précédent
              </Button>
              
              {currentQuestion === questions.length - 1 ? (
                <Button onClick={() => {
                  toast({
                    title: "Examen soumis",
                    description: "Vos réponses ont été enregistrées avec succès.",
                  });
                }}>
                  Soumettre l'examen
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                >
                  Suivant
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamInterface;
