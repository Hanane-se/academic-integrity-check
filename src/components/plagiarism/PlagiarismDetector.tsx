
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Search, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PlagiarismResult {
  similarity: number;
  sources: string[];
  flagged: boolean;
}

interface PlagiarismDetectorProps {
  text: string;
  onResult: (result: PlagiarismResult) => void;
}

const PlagiarismDetector = ({ text, onResult }: PlagiarismDetectorProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const { toast } = useToast();

  const analyzePlagiarism = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate Chroma vector analysis
    const steps = [
      { message: "Préparation du texte...", duration: 500 },
      { message: "Génération des embeddings vectoriels...", duration: 1000 },
      { message: "Recherche dans la base de données Chroma...", duration: 1500 },
      { message: "Comparaison avec les sources en ligne...", duration: 1000 },
      { message: "Calcul du score de similarité...", duration: 500 }
    ];

    for (let i = 0; i < steps.length; i++) {
      toast({
        title: "Analyse en cours",
        description: steps[i].message,
      });
      
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setProgress(((i + 1) / steps.length) * 100);
    }

    // Simulate detection results
    const mockResult: PlagiarismResult = {
      similarity: Math.random() * 100,
      sources: [
        "Wikipedia - Article sur le sujet",
        "Cours en ligne - Université de Lyon",
        "Document académique - ResearchGate"
      ],
      flagged: Math.random() > 0.7
    };

    setResult(mockResult);
    setIsAnalyzing(false);
    onResult(mockResult);

    if (mockResult.flagged) {
      toast({
        title: "Plagiat détecté",
        description: `Similarité de ${mockResult.similarity.toFixed(1)}% avec des sources existantes`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Analyse terminée",
        description: "Aucun plagiat significatif détecté",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>Détection de plagiat</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Texte à analyser</span>
          </div>
          <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
            {text.substring(0, 200)}...
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {text.length} caractères
          </div>
        </div>

        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Analyse vectorielle en cours...</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {result && !isAnalyzing && (
          <div className="space-y-4">
            <Alert className={result.flagged ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
              {result.flagged ? (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={result.flagged ? "text-red-700" : "text-green-700"}>
                {result.flagged 
                  ? `PLAGIAT DÉTECTÉ - Similarité: ${result.similarity.toFixed(1)}%`
                  : `Aucun plagiat détecté - Similarité: ${result.similarity.toFixed(1)}%`
                }
              </AlertDescription>
            </Alert>

            {result.sources.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2">Sources similaires trouvées:</h4>
                <ul className="space-y-1">
                  {result.sources.map((source, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <Button 
          onClick={analyzePlagiarism} 
          disabled={isAnalyzing || !text.trim()}
          className="w-full"
        >
          {isAnalyzing ? "Analyse en cours..." : "Détecter le plagiat"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlagiarismDetector;
