import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Star, Bug, Lightbulb, Heart, Download, Send } from "lucide-react";
import { AnalyticsManager, FeedbackType } from "@/lib/analytics";

interface FeedbackDialogProps {
  trigger?: React.ReactNode;
}

const FeedbackDialog = ({ trigger }: FeedbackDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general_feedback');
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  
  const { toast } = useToast();

  const feedbackTypes = [
    {
      value: 'general_feedback',
      label: 'Feedback Umum',
      icon: Heart,
      description: 'Saran dan masukan umum'
    },
    {
      value: 'feature_request',
      label: 'Permintaan Fitur',
      icon: Lightbulb,
      description: 'Fitur baru yang diinginkan'
    },
    {
      value: 'bug_report',
      label: 'Laporan Bug',
      icon: Bug,
      description: 'Laporkan masalah teknis'
    },
    {
      value: 'rating',
      label: 'Rating Aplikasi',
      icon: Star,
      description: 'Beri rating aplikasi'
    }
  ];

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon isi judul dan deskripsi feedback",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare WhatsApp message
      const feedbackMessage = `*Feedback Madrasah RPP Wizard*

*Tipe:* ${feedbackType === 'general_feedback' ? 'Feedback Umum' : 
         feedbackType === 'feature_request' ? 'Request Fitur' : 
         feedbackType === 'bug_report' ? 'Bug Report' : 'Rating'}

${feedbackType === 'rating' ? `*Rating:* ${rating}/5 ⭐` : ''}

*Judul:* ${title.trim()}

*Deskripsi:* ${description.trim()}

${contactEmail.trim() ? `*Email Kontak:* ${contactEmail.trim()}` : ''}

---
Dikirim dari: ${window.location.href}`;

      // Encode message for WhatsApp
      const encodedMessage = encodeURIComponent(feedbackMessage);
      const whatsappUrl = `https://wa.me/6285785377790?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Track in analytics
      AnalyticsManager.submitFeedback({
        type: feedbackType,
        rating: feedbackType === 'rating' ? rating : undefined,
        title: title.trim(),
        description: description.trim(),
        contactEmail: contactEmail.trim() || undefined
      });

      AnalyticsManager.trackEvent('feedback_submit', {
        type: feedbackType,
        hasRating: feedbackType === 'rating' && rating > 0,
        hasContact: !!contactEmail.trim(),
        method: 'whatsapp'
      });

      toast({
        title: "Feedback Terkirim! 🎉",
        description: "Feedback Anda akan dikirim ke WhatsApp kami. Terima kasih!",
      });

      // Reset form
      setFeedbackType('general_feedback');
      setRating(0);
      setTitle('');
      setDescription('');
      setContactEmail('');
      setIsOpen(false);

    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast({
        title: "Gagal mengirim feedback",
        description: "Terjadi kesalahan saat mengirim feedback. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFeedbackIcon = (type: FeedbackType) => {
    const feedbackType = feedbackTypes.find(ft => ft.value === type);
    return feedbackType?.icon || MessageSquare;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Berikan Feedback
          </DialogTitle>
          <DialogDescription>
            Bantu kami meningkatkan aplikasi dengan memberikan feedback, saran, atau melaporkan masalah.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Feedback Type Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Jenis Feedback</Label>
            <div className="grid grid-cols-2 gap-3">
              {feedbackTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-all ${
                      feedbackType === type.value
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setFeedbackType(type.value as FeedbackType)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium text-sm">{type.label}</h4>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Rating Section (for rating type) */}
          {feedbackType === 'rating' && (
            <div>
              <Label className="text-sm font-medium mb-3 block">Rating Aplikasi</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {rating === 0 && "Pilih rating dari 1-5 bintang"}
                {rating === 1 && "Sangat tidak puas"}
                {rating === 2 && "Tidak puas"}
                {rating === 3 && "Cukup"}
                {rating === 4 && "Puas"}
                {rating === 5 && "Sangat puas"}
              </p>
            </div>
          )}

          {/* Title Input */}
          <div>
            <Label htmlFor="feedback-title" className="text-sm font-medium">
              Judul Feedback
            </Label>
            <Input
              id="feedback-title"
              placeholder={
                feedbackType === 'bug_report' ? "Deskripsi singkat masalah..."
                : feedbackType === 'feature_request' ? "Fitur yang diinginkan..."
                : feedbackType === 'rating' ? "Judul feedback Anda..."
                : "Judul feedback Anda..."
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Description Input */}
          <div>
            <Label htmlFor="feedback-description" className="text-sm font-medium">
              Deskripsi Detail
            </Label>
            <Textarea
              id="feedback-description"
              placeholder={
                feedbackType === 'bug_report' ? "Jelaskan masalah yang Anda temukan, langkah-langkah untuk mereproduksi, dan hasil yang diharapkan..."
                : feedbackType === 'feature_request' ? "Jelaskan fitur yang Anda inginkan, manfaatnya, dan contoh penggunaan..."
                : feedbackType === 'rating' ? "Jelaskan pengalaman Anda menggunakan aplikasi ini..."
                : "Jelaskan feedback Anda secara detail..."
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>

          {/* Contact Email (Optional) */}
          <div>
            <Label htmlFor="feedback-email" className="text-sm font-medium">
              Email Kontak (Opsional)
            </Label>
            <Input
              id="feedback-email"
              type="email"
              placeholder="email@example.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Jika Anda ingin kami menghubungi untuk follow-up
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Kirim Feedback
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog; 