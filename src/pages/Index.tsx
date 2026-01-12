import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const podcasts = [
  {
    id: 1,
    title: 'Квантовая физика и будущее технологий',
    author: 'Александр Иванов',
    avatar: 'AI',
    duration: '45:23',
    views: 12500,
    likes: 892,
    gradient: 'gradient-purple',
    category: 'Наука',
    rating: 4.8
  },
  {
    id: 2,
    title: 'История российской музыки: от классики до хип-хопа',
    author: 'Мария Соколова',
    avatar: 'МС',
    duration: '38:15',
    views: 8900,
    likes: 645,
    gradient: 'gradient-orange',
    category: 'Музыка',
    rating: 4.6
  },
  {
    id: 3,
    title: 'Предпринимательство в эпоху AI',
    author: 'Дмитрий Петров',
    avatar: 'ДП',
    duration: '52:40',
    views: 15200,
    likes: 1120,
    gradient: 'gradient-blue',
    category: 'Бизнес',
    rating: 4.9
  },
  {
    id: 4,
    title: 'Психология современных отношений',
    author: 'Елена Волкова',
    avatar: 'ЕВ',
    duration: '41:30',
    views: 9800,
    likes: 734,
    gradient: 'gradient-purple',
    category: 'Психология',
    rating: 4.7
  },
  {
    id: 5,
    title: 'Космос: новые открытия 2026',
    author: 'Игорь Новиков',
    avatar: 'ИН',
    duration: '48:50',
    views: 11300,
    likes: 856,
    gradient: 'gradient-orange',
    category: 'Наука',
    rating: 4.8
  },
  {
    id: 6,
    title: 'Медитация и осознанность в XXI веке',
    author: 'Анна Морозова',
    avatar: 'АМ',
    duration: '35:20',
    views: 7600,
    likes: 612,
    gradient: 'gradient-blue',
    category: 'Здоровье',
    rating: 4.5
  }
];

const comments = [
  { id: 1, author: 'Сергей К.', text: 'Невероятно интересный подкаст! Слушал на одном дыхании 🔥', avatar: 'СК' },
  { id: 2, author: 'Ольга М.', text: 'Спасибо за качественный контент, жду продолжения!', avatar: 'ОМ' },
  { id: 3, author: 'Андрей Л.', text: 'Очень познавательно, рекомендую всем', avatar: 'АЛ' }
];

export default function Index() {
  const [selectedPodcast, setSelectedPodcast] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState('main');
  const [likedPodcasts, setLikedPodcasts] = useState<Set<number>>(new Set());
  const [dislikedPodcasts, setDislikedPodcasts] = useState<Set<number>>(new Set());
  const [subscribedAuthors, setSubscribedAuthors] = useState<Set<string>>(new Set());
  const [newComment, setNewComment] = useState('');

  const currentPodcast = podcasts.find(p => p.id === selectedPodcast);

  const handleLike = (id: number) => {
    setLikedPodcasts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
        dislikedPodcasts.delete(id);
      }
      return newSet;
    });
  };

  const handleDislike = (id: number) => {
    setDislikedPodcasts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
        likedPodcasts.delete(id);
      }
      return newSet;
    });
  };

  const handleSubscribe = (author: string) => {
    setSubscribedAuthors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(author)) {
        newSet.delete(author);
      } else {
        newSet.add(author);
      }
      return newSet;
    });
  };

  const renderMainFeed = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 animate-fade-in">
      {podcasts.map((podcast, idx) => (
        <Card 
          key={podcast.id} 
          className={`overflow-hidden cursor-pointer hover-scale border-0 ${podcast.gradient} animate-scale-in`}
          style={{ animationDelay: `${idx * 0.1}s` }}
          onClick={() => setSelectedPodcast(podcast.id)}
        >
          <div className="aspect-video relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20 font-heading">
              {podcast.category[0]}
            </div>
            <div className="absolute top-3 right-3">
              <Badge className="bg-black/40 backdrop-blur-sm border-0 text-white">
                {podcast.duration}
              </Badge>
            </div>
            <div className="absolute top-3 left-3">
              <Badge className="bg-black/40 backdrop-blur-sm border-0 text-white">
                ⭐ {podcast.rating}
              </Badge>
            </div>
          </div>
          <div className="p-4 bg-card/95 backdrop-blur-sm">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="border-2 border-primary/50">
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                  {podcast.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-base line-clamp-2 mb-1 text-shadow">
                  {podcast.title}
                </h3>
                <p className="text-sm text-muted-foreground">{podcast.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Eye" size={16} />
                {podcast.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Heart" size={16} />
                {podcast.likes}
              </span>
              <Badge variant="outline" className="ml-auto">
                {podcast.category}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPlayer = () => {
    if (!currentPodcast) return null;

    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 animate-fade-in">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedPodcast(null)}
            >
              <Icon name="X" size={24} />
            </Button>
            <h2 className="font-heading font-bold text-xl">Сейчас играет</h2>
            <div className="w-10" />
          </div>

          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-6">
              <div className={`${currentPodcast.gradient} rounded-3xl aspect-video mb-6 flex items-center justify-center text-9xl font-heading font-bold text-white/30 animate-scale-in`}>
                {currentPodcast.category[0]}
              </div>

              <div className="mb-6">
                <h1 className="font-heading font-bold text-3xl mb-4 text-shadow">
                  {currentPodcast.title}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {currentPodcast.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{currentPodcast.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentPodcast.views.toLocaleString()} просмотров
                    </p>
                  </div>
                  <Button
                    variant={subscribedAuthors.has(currentPodcast.author) ? "secondary" : "default"}
                    className={subscribedAuthors.has(currentPodcast.author) ? "" : "gradient-purple border-0"}
                    onClick={() => handleSubscribe(currentPodcast.author)}
                  >
                    {subscribedAuthors.has(currentPodcast.author) ? (
                      <>
                        <Icon name="Check" size={18} className="mr-2" />
                        Подписан
                      </>
                    ) : (
                      <>
                        <Icon name="UserPlus" size={18} className="mr-2" />
                        Подписаться
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleLike(currentPodcast.id)}
                    className={likedPodcasts.has(currentPodcast.id) ? "bg-primary/20 border-primary" : ""}
                  >
                    <Icon 
                      name={likedPodcasts.has(currentPodcast.id) ? "ThumbsUp" : "ThumbsUp"} 
                      size={20} 
                      className="mr-2"
                    />
                    {currentPodcast.likes + (likedPodcasts.has(currentPodcast.id) ? 1 : 0)}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleDislike(currentPodcast.id)}
                    className={dislikedPodcasts.has(currentPodcast.id) ? "bg-destructive/20 border-destructive" : ""}
                  >
                    <Icon name="ThumbsDown" size={20} className="mr-2" />
                    {dislikedPodcasts.has(currentPodcast.id) ? "Не нравится" : "Дизлайк"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Share2" size={20} className="mr-2" />
                    Поделиться
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-heading font-bold text-xl mb-4">Комментарии</h3>
                <div className="mb-4">
                  <Textarea
                    placeholder="Оставьте свой комментарий..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2"
                  />
                  <Button className="gradient-purple border-0">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </div>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {comment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{comment.author}</p>
                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    if (activeSection === 'likes') {
      const likedPodcastsList = podcasts.filter(p => likedPodcasts.has(p.id));
      return (
        <div className="p-6">
          <h2 className="font-heading font-bold text-2xl mb-6">Понравившиеся</h2>
          {likedPodcastsList.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              Вы пока не поставили лайк ни одному подкасту
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedPodcastsList.map((podcast) => (
                <Card 
                  key={podcast.id} 
                  className={`overflow-hidden cursor-pointer hover-scale border-0 ${podcast.gradient}`}
                  onClick={() => setSelectedPodcast(podcast.id)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20 font-heading">
                      {podcast.category[0]}
                    </div>
                  </div>
                  <div className="p-4 bg-card/95">
                    <h3 className="font-heading font-bold text-base line-clamp-2 mb-2">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{podcast.author}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (activeSection === 'subscriptions') {
      const subscribedPodcasts = podcasts.filter(p => subscribedAuthors.has(p.author));
      return (
        <div className="p-6">
          <h2 className="font-heading font-bold text-2xl mb-6">Подписки</h2>
          {subscribedPodcasts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              У вас пока нет подписок
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscribedPodcasts.map((podcast) => (
                <Card 
                  key={podcast.id} 
                  className={`overflow-hidden cursor-pointer hover-scale border-0 ${podcast.gradient}`}
                  onClick={() => setSelectedPodcast(podcast.id)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20 font-heading">
                      {podcast.category[0]}
                    </div>
                  </div>
                  <div className="p-4 bg-card/95">
                    <h3 className="font-heading font-bold text-base line-clamp-2 mb-2">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{podcast.author}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      );
    }

    return renderMainFeed();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-lg z-40">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-heading font-black text-3xl gradient-purple bg-clip-text text-transparent">
            CastTivi
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Search" size={24} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={24} />
            </Button>
            <Button className="gradient-purple border-0">
              <Icon name="Upload" size={18} className="mr-2" />
              Загрузить
            </Button>
            <Avatar className="border-2 border-primary cursor-pointer hover-scale">
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                Я
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-[73px] z-30">
        <ScrollArea className="w-full">
          <div className="flex gap-2 p-4">
            {[
              { id: 'main', icon: 'Home', label: 'Главная' },
              { id: 'playlist', icon: 'ListMusic', label: 'Плейлисты' },
              { id: 'music', icon: 'Music', label: 'Музыка' },
              { id: 'likes', icon: 'Heart', label: 'Лайки' },
              { id: 'subscriptions', icon: 'UserCheck', label: 'Подписки' },
              { id: 'archive', icon: 'Archive', label: 'Архив' }
            ].map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'ghost'}
                className={activeSection === section.id ? 'gradient-purple border-0' : ''}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon name={section.icon as any} size={18} className="mr-2" />
                {section.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </nav>

      <main>
        {renderSection()}
      </main>

      {selectedPodcast && renderPlayer()}
    </div>
  );
}
