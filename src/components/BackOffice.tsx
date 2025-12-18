import React, { useEffect, useState } from 'react';
import { supabase, Category, Post } from '../lib/supabase';

interface BackOfficeProps {
  onBack?: () => void;
}

export default function BackOffice({ onBack }: BackOfficeProps) {
  const [section, setSection] = useState<'categories' | 'posts'>('categories');

  // categories state
  const [categories, setCategories] = useState<Category[]>([]);
  const [catLoading, setCatLoading] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLoading, setPostLoading] = useState(false);
  const [pTitle, setPTitle] = useState('');
  const [pSlug, setPSlug] = useState('');
  const [pExcerpt, setPExcerpt] = useState('');
  const [pContent, setPContent] = useState('');
  const [pImage, setPImage] = useState('');
  const [pImageUploading, setPImageUploading] = useState(false);
  const [pCategoryId, setPCategoryId] = useState<string | null>(null);
  const [pPublished, setPPublished] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
    loadPosts();
  }, []);

  async function loadCategories() {
    setCatLoading(true);
    const { data, error } = await supabase.from('categories').select('*').order('name');

    if (error) {
      console.error('Erreur chargement catégories', error);
      alert('Erreur lors du chargement des catégories');
    } else if (data) {
      setCategories(data as Category[]);
    }

    setCatLoading(false);
  }

  async function loadPosts() {
    setPostLoading(true);
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Erreur chargement posts', error);
      alert('Erreur lors du chargement des posts');
    } else if (data) {
      setPosts(data as Post[]);
    }
    setPostLoading(false);
  }

  function resetForm() {
    setName('');
    setSlug('');
    setDescription('');
    setEditingId(null);
  }

  function resetPostForm() {
    setPTitle('');
    setPSlug('');
    setPExcerpt('');
    setPContent('');
    setPImage('');
    setPCategoryId(null);
    setPPublished(false);
    setEditingPostId(null);
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    if (!name || !slug) {
      alert('Nom et slug requis');
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from('categories')
        .update({ name, slug, description: description || null })
        .eq('id', editingId);

      if (error) {
        console.error('Erreur mise à jour', error);
        alert('Erreur lors de la mise à jour');
      } else {
        await loadCategories();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('categories')
        .insert([{ name, slug, description: description || null }]);

      if (error) {
        console.error('Erreur création', error);
        alert('Erreur lors de la création');
      } else {
        await loadCategories();
        resetForm();
      }
    }
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startEditPost(post: Post) {
    setEditingPostId(post.id);
    setPTitle(post.title);
    setPSlug(post.slug);
    setPExcerpt(post.excerpt || '');
    setPContent(post.content);
    setPImage(post.image_url || '');
    setPCategoryId(post.category_id);
    setPPublished(Boolean(post.published));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setPImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) {
        console.error('Erreur upload image', uploadError);
        alert('Erreur lors de l\'upload de l\'image. Vérifiez le bucket `images`.');
        setPImageUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
      const publicUrl = urlData?.publicUrl || '';
      setPImage(publicUrl);
    } catch (err) {
      console.error('Erreur upload', err);
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setPImageUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette catégorie ?')) return;

    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) {
      console.error('Erreur suppression', error);
      alert('Erreur lors de la suppression');
    } else {
      await loadCategories();
    }
  }

  async function handlePostDelete(id: string) {
    if (!confirm('Supprimer cet article ?')) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      console.error('Erreur suppression post', error);
      alert('Erreur lors de la suppression');
    } else {
      await loadPosts();
    }
  }

  async function handlePostSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!pTitle || !pSlug) {
      alert('Titre et slug requis');
      return;
    }

    if (editingPostId) {
      const { error } = await supabase
        .from('posts')
        .update({
          title: pTitle,
          slug: pSlug,
          excerpt: pExcerpt || null,
          content: pContent,
          image_url: pImage || null,
          category_id: pCategoryId,
          published: pPublished,
        })
        .eq('id', editingPostId);

      if (error) {
        console.error('Erreur mise à jour post', error);
        alert('Erreur lors de la mise à jour');
      } else {
        await loadPosts();
        resetPostForm();
      }
    } else {
      const { error } = await supabase.from('posts').insert([
        {
          title: pTitle,
          slug: pSlug,
          excerpt: pExcerpt || null,
          content: pContent,
          image_url: pImage || null,
          category_id: pCategoryId,
          published: pPublished,
        },
      ]);

      if (error) {
        console.error('Erreur création post', error);
        alert('Erreur lors de la création');
      } else {
        await loadPosts();
        resetPostForm();
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex flex-col sm:flex-row max-w-7xl items-start sm:items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold">BackOffice</h1>
            <span className="text-sm text-gray-500">Gestion des modèles</span>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSection('categories')}
              className={`rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm ${section === 'categories' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border'}`}
            >
              Catégories
            </button>
            <button
              onClick={() => setSection('posts')}
              className={`rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm ${section === 'posts' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border'}`}
            >
              Articles
            </button>
            <button
              onClick={() => { onBack && onBack(); window.location.reload(); }}
              className="ml-2 sm:ml-4 rounded-md bg-gray-100 px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-700"
            >
              Retour au site
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {section === 'categories' ? (
          <section>
            <h2 className="text-xl font-semibold mb-4">Catégories</h2>

            <form onSubmit={handleSubmit} className="mb-6 grid gap-3 sm:grid-cols-3">
              <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
              <input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
              <div className="flex flex-col sm:flex-row gap-2">
                <input placeholder="Description (optionnelle)" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl border px-3 py-2 flex-1" />
                <button type="submit" className="w-full sm:w-auto rounded-full bg-green-600 px-4 py-2 text-white text-sm">{editingId ? 'Mettre à jour' : 'Créer'}</button>
                {editingId && (<button type="button" onClick={resetForm} className="w-full sm:w-auto rounded-full bg-gray-100 px-4 py-2 text-sm">Annuler</button>)}
              </div>
            </form>

            <div className="rounded-lg border bg-white overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-gray-600">Nom</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-600">Slug</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-600">Description</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {catLoading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">Chargement...</td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">Aucune catégorie.</td>
                    </tr>
                  ) : (
                    categories.map((cat) => (
                      <tr key={cat.id} className="border-t">
                        <td className="px-4 py-3 break-words">{cat.name}</td>
                        <td className="px-4 py-3 break-words">{cat.slug}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 break-words">{cat.description}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex flex-col sm:flex-row items-center gap-2">
                            <button type="button" onClick={() => startEdit(cat)} className="w-full sm:w-auto rounded-full bg-gray-100 px-3 py-1 text-sm">Éditer</button>
                            <button type="button" onClick={() => handleDelete(cat.id)} className="w-full sm:w-auto rounded-full bg-red-50 px-3 py-1 text-sm text-red-600">Supprimer</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-xl font-semibold mb-4">Articles</h2>

            <form onSubmit={handlePostSubmit} className="mb-6 grid gap-3 sm:grid-cols-3">
              {/* Titre large au-dessus du contenu */}
              <input
                placeholder="Titre"
                value={pTitle}
                onChange={(e) => setPTitle(e.target.value)}
                className="sm:col-span-3 w-full rounded-xl border px-3 py-3 text-lg font-semibold"
              />

              {/* Ligne des métadonnées */}
              <div className="sm:col-span-3 grid gap-2 grid-cols-1 md:grid-cols-3">
                <input placeholder="Slug" value={pSlug} onChange={(e) => setPSlug(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
                <input placeholder="Excerpt" value={pExcerpt} onChange={(e) => setPExcerpt(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
                <div className="flex items-center gap-2">
                  <select value={pCategoryId ?? ''} onChange={(e) => setPCategoryId(e.target.value || null)} className="rounded-xl border px-3 py-2 flex-1">
                    <option value="">Sans catégorie</option>
                    {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                  </select>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={pPublished} onChange={(e) => setPPublished(e.target.checked)} />
                    <span className="text-sm">Publié</span>
                  </label>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="sm:col-span-3 grid gap-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <label className="rounded-md bg-white border px-3 py-2 text-sm cursor-pointer">
                      {pImageUploading ? 'Téléchargement...' : 'Choisir une image'}
                      <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                    </label>
                    {pImage ? (
                      <img src={pImage} alt="aperçu" className="h-16 w-24 object-cover rounded-md border" />
                    ) : (
                      <div className="h-16 w-24 rounded-md border bg-gray-50 flex items-center justify-center text-xs text-gray-400">Aperçu</div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="submit" className="rounded-full bg-green-600 px-4 py-2 text-white text-sm">{editingPostId ? 'Mettre à jour' : 'Créer'}</button>
                    {editingPostId && (<button type="button" onClick={resetPostForm} className="rounded-full bg-gray-100 px-4 py-2 text-sm">Annuler</button>)}
                  </div>
                </div>

                {/* Contenu de l'article */}
                <textarea
                  placeholder="Contenu de l'article"
                  rows={8}
                  value={pContent}
                  onChange={(e) => setPContent(e.target.value)}
                  className="sm:col-span-3 rounded-xl border px-3 py-2 w-full"
                />
              </div>
            </form>

            <div className="rounded-lg border bg-white overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-gray-600">Titre</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-600">Slug</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-600">Catégorie</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-600">Publié</th>
                    <th className="px-4 py-2 text-right text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {postLoading ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">Chargement...</td>
                    </tr>
                  ) : posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">Aucun article.</td>
                    </tr>
                  ) : (
                    posts.map((p) => (
                      <tr key={p.id} className="border-t">
                              <td className="px-4 py-3 break-words">{p.title}</td>
                              <td className="px-4 py-3 break-words">{p.slug}</td>
                              <td className="px-4 py-3 break-words">{(categories.find((c) => c.id === p.category_id) || { name: '' }).name}</td>
                              <td className="px-4 py-3">{p.published ? 'Oui' : 'Non'}</td>
                              <td className="px-4 py-3 text-right">
                                <div className="inline-flex flex-col sm:flex-row items-center gap-2">
                                  <button type="button" onClick={() => startEditPost(p)} className="w-full sm:w-auto rounded-full bg-gray-100 px-2 py-1 text-xs sm:text-sm">Éditer</button>
                                  <button type="button" onClick={() => handlePostDelete(p.id)} className="w-full sm:w-auto rounded-full bg-red-50 px-2 py-1 text-xs sm:text-sm text-red-600">Supprimer</button>
                                </div>
                              </td>
                            </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t bg-white py-4">
        <div className="mx-auto max-w-7xl px-6 text-sm text-gray-500">© {new Date().getFullYear()} ÉcoVie — BackOffice</div>
      </footer>
    </div>
  );
}
