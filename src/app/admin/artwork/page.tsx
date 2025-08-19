import AdminAuth from "@/components/AdminAuth";
import ArtworkManager from "@/components/ArtworkManager";

export default function AdminArtworkPage() {
  return (
    <AdminAuth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Artwork Management</h1>
          <p className="text-gray-600 mt-2">Upload and manage your original artwork for the gallery</p>
        </div>
        <ArtworkManager />
      </div>
    </AdminAuth>
  );
}
