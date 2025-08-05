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

      {/* Capaian Pembelajaran */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Capaian Pembelajaran (CP)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-primary mb-1">Pengetahuan:</p>
              <p className="text-sm leading-relaxed">{rpp.capaianPembelajaran.pengetahuan}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-accent-foreground mb-1">Keterampilan:</p>
              <p className="text-sm leading-relaxed">{rpp.capaianPembelajaran.keterampilan}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-green-600 mb-1">Sikap:</p>
              <p className="text-sm leading-relaxed">{rpp.capaianPembelajaran.sikap}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dimensi Profil Lulusan */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Dimensi Profil Lulusan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-2 bg-primary/5 rounded-lg">
              <p className="text-sm font-medium text-primary">Cinta kepada Tuhan Yang Maha Esa</p>
            </div>
            <div className="p-2 bg-accent/5 rounded-lg">
              <p className="text-sm font-medium text-accent-foreground">Cinta kepada Diri dan Sesama</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <p className="text-sm font-medium text-green-700">Cinta kepada Ilmu Pengetahuan</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <p className="text-sm font-medium text-blue-700">Cinta kepada Lingkungan</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <p className="text-sm font-medium text-orange-700">Cinta kepada Bangsa dan Negeri</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pendekatan Pembelajaran */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Pendekatan Pembelajaran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-primary/5 rounded-lg">
            <p className="text-sm leading-relaxed">{rpp.identitas.pendekatanPembelajaran}</p>
          </div>
        </CardContent>
      </Card>

      {/* Praktik Pedagogis */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Praktik Pedagogis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rpp.modelPembelajaran && rpp.modelPembelajaran.length > 0 && (
            <div>
              <h4 className="font-semibold text-primary mb-2">Model Pembelajaran:</h4>
              <div className="flex flex-wrap gap-2">
                {rpp.modelPembelajaran.map((model, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {rpp.metodePembelajaran && rpp.metodePembelajaran.length > 0 && (
            <div>
              <h4 className="font-semibold text-accent-foreground mb-2">Metode Pembelajaran:</h4>
              <div className="flex flex-wrap gap-2">
                {rpp.metodePembelajaran.map((metode, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {metode}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {rpp.kemitraanPembelajaran && rpp.kemitraanPembelajaran.length > 0 && (
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Kemitraan Pembelajaran:</h4>
              <div className="flex flex-wrap gap-2">
                {rpp.kemitraanPembelajaran.map((kemitraan, index) => (
                  <Badge key={index} variant="default" className="text-xs bg-green-100 text-green-800">
                    {kemitraan}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {rpp.lingkunganPembelajaran && rpp.lingkunganPembelajaran.length > 0 && (
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Lingkungan Pembelajaran:</h4>
              <div className="flex flex-wrap gap-2">
                {rpp.lingkunganPembelajaran.map((lingkungan, index) => (
                  <Badge key={index} variant="default" className="text-xs bg-blue-100 text-blue-800">
                    {lingkungan}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {rpp.pemanfaatanDigital && rpp.pemanfaatanDigital.length > 0 && (
            <div>
              <h4 className="font-semibold text-purple-600 mb-2">Pemanfaatan Digital:</h4>
              <div className="flex flex-wrap gap-2">
                {rpp.pemanfaatanDigital.map((digital, index) => (
                  <Badge key={index} variant="default" className="text-xs bg-purple-100 text-purple-800">
                    {digital}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nilai Cinta */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Nilai Cinta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-primary/5 rounded-lg">
            <p className="text-sm leading-relaxed">{(rpp.identitas.nilaiCinta || []).join(", ")}</p>
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
            {(rpp.tujuanPembelajaran || []).map((tujuan, index) => (
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
                {(rpp.materiPembelajaran?.faktual || []).map((materi, index) => (
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
                {(rpp.materiPembelajaran?.konseptual || []).map((materi, index) => (
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
                {(rpp.materiPembelajaran?.prosedural || []).map((materi, index) => (
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
                {(rpp.materiPembelajaran?.metakognitif || []).map((materi, index) => (
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
            {(rpp.metodePembelajaran || []).map((metode, index) => (
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
              {(rpp.mediaDanSumber?.media || []).map((media, index) => (
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
              {(rpp.mediaDanSumber?.sumberBelajar || []).map((sumber, index) => (
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