import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GeneratedRPP } from "@/lib/rpp-generator";
import { BookOpen, Target, Users, Clock, CheckCircle, Award, BookmarkCheck } from "lucide-react";

interface RppViewerProps {
  rpp: GeneratedRPP;
}

const RppViewer = ({ rpp }: RppViewerProps) => {
  return (
    <div className="space-y-6">
      {/* Identitas RPP */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            Identitas RPP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satuan Pendidikan</p>
                <p className="font-semibold text-lg">{rpp.identitas.satuan}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mata Pelajaran</p>
                <p className="font-semibold">{rpp.identitas.mataPelajaran}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tema/Materi</p>
                <p className="font-semibold">{rpp.identitas.tema}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sub Tema</p>
                <p className="font-semibold text-primary">{rpp.identitas.subtema}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kelas/Semester</p>
                <p className="font-semibold">{rpp.identitas.kelas} / {rpp.identitas.semester}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alokasi Waktu</p>
                <p className="font-semibold">{rpp.identitas.alokasi}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pertemuan</p>
                <p className="font-semibold">{rpp.identitas.pertemuan}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kompetensi Inti */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Kompetensi Inti (KI)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rpp.kompetensiInti.map((ki, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm leading-relaxed">{ki}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kompetensi Dasar */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Kompetensi Dasar (KD)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary mb-2">KD Pengetahuan:</h4>
            <p className="text-sm bg-primary/5 p-3 rounded-lg">{rpp.kompetensiDasar.pengetahuan}</p>
          </div>
          <div>
            <h4 className="font-semibold text-accent-foreground mb-2">KD Keterampilan:</h4>
            <p className="text-sm bg-accent/10 p-3 rounded-lg">{rpp.kompetensiDasar.keterampilan}</p>
          </div>
        </CardContent>
      </Card>

      {/* Indikator Pencapaian Kompetensi */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Indikator Pencapaian Kompetensi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-primary mb-3">Indikator Pengetahuan:</h4>
            <ul className="space-y-2">
              {rpp.indikator.pengetahuan.map((indikator, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary text-sm mt-1">•</span>
                  <span className="text-sm">{indikator}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-accent-foreground mb-3">Indikator Keterampilan:</h4>
            <ul className="space-y-2">
              {rpp.indikator.keterampilan.map((indikator, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent-foreground text-sm mt-1">•</span>
                  <span className="text-sm">{indikator}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tujuan Pembelajaran */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Tujuan Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {rpp.tujuanPembelajaran.map((tujuan, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{tujuan}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Materi Pembelajaran */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookmarkCheck className="h-5 w-5 text-primary" />
            Materi Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-3">Faktual:</h4>
              <ul className="space-y-1">
                {rpp.materiPembelajaran.faktual.map((materi, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{materi}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-3">Konseptual:</h4>
              <ul className="space-y-1">
                {rpp.materiPembelajaran.konseptual.map((materi, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{materi}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-accent-foreground mb-3">Prosedural:</h4>
              <ul className="space-y-1">
                {rpp.materiPembelajaran.prosedural.map((materi, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-accent-foreground">•</span>
                    <span>{materi}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-accent-foreground mb-3">Metakognitif:</h4>
              <ul className="space-y-1">
                {rpp.materiPembelajaran.metakognitif.map((materi, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-accent-foreground">•</span>
                    <span>{materi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metode Pembelajaran */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Metode Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {rpp.metodePembelajaran.map((metode, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                {metode}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Media dan Sumber Belajar */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Media dan Sumber Belajar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-primary mb-3">Media Pembelajaran:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {rpp.mediaDanSumber.media.map((media, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-primary" />
                  <span>{media}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-accent-foreground mb-3">Sumber Belajar:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {rpp.mediaDanSumber.sumberBelajar.map((sumber, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-accent-foreground" />
                  <span>{sumber}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Langkah Pembelajaran */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Langkah-Langkah Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pendahuluan */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-primary">Kegiatan Pendahuluan</h4>
              <Badge variant="outline">{rpp.langkahPembelajaran.pendahuluan.waktu}</Badge>
            </div>
            <ul className="space-y-2 pl-4">
              {rpp.langkahPembelajaran.pendahuluan.kegiatan.map((kegiatan, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span>{kegiatan}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Inti */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-primary">Kegiatan Inti</h4>
              <Badge variant="outline">{rpp.langkahPembelajaran.inti.waktu}</Badge>
            </div>
            <ul className="space-y-2 pl-4">
              {rpp.langkahPembelajaran.inti.kegiatan.map((kegiatan, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span>{kegiatan}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Penutup */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-primary">Kegiatan Penutup</h4>
              <Badge variant="outline">{rpp.langkahPembelajaran.penutup.waktu}</Badge>
            </div>
            <ul className="space-y-2 pl-4">
              {rpp.langkahPembelajaran.penutup.kegiatan.map((kegiatan, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span>{kegiatan}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Penilaian */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Penilaian
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Penilaian Sikap */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Penilaian Sikap</h4>
            <div className="bg-primary/5 p-4 rounded-lg space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Teknik:</p>
                  <p className="text-sm font-semibold">{rpp.penilaian.sikap.teknik}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Instrumen:</p>
                  <p className="text-sm font-semibold">{rpp.penilaian.sikap.instrumen}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Rubrik Penilaian:</p>
                <ul className="space-y-1">
                  {rpp.penilaian.sikap.rubrik.map((rubrik, index) => (
                    <li key={index} className="text-xs">{rubrik}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Penilaian Pengetahuan */}
          <div>
            <h4 className="font-semibold text-accent-foreground mb-3">Penilaian Pengetahuan</h4>
            <div className="bg-accent/10 p-4 rounded-lg space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Teknik:</p>
                  <p className="text-sm font-semibold">{rpp.penilaian.pengetahuan.teknik}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Instrumen:</p>
                  <p className="text-sm font-semibold">{rpp.penilaian.pengetahuan.instrumen}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Kisi-kisi:</p>
                <ul className="space-y-1">
                  {rpp.penilaian.pengetahuan.kisiKisi.map((kisi, index) => (
                    <li key={index} className="text-xs">{kisi}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Penilaian Keterampilan */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Penilaian Keterampilan</h4>
            <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Teknik:</p>
                  <p className="text-sm font-semibold">{rpp.penilaian.keterampilan.teknik}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Instrumen:</p>
                  <p className="text-sm font-semibold">{rpp.penilaian.keterampilan.instrumen}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Rubrik Penilaian:</p>
                <ul className="space-y-1">
                  {rpp.penilaian.keterampilan.rubrik.map((rubrik, index) => (
                    <li key={index} className="text-xs">{rubrik}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Remedial dan Pengayaan */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Remedial dan Pengayaan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-primary mb-3">Program Remedial:</h4>
            <ul className="space-y-2">
              {rpp.remedialDanPengayaan.remedial.map((remedial, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{remedial}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold text-accent-foreground mb-3">Program Pengayaan:</h4>
            <ul className="space-y-2">
              {rpp.remedialDanPengayaan.pengayaan.map((pengayaan, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                  <span>{pengayaan}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RppViewer;