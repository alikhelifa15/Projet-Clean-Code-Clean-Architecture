 export const renderBase64Image = (base64String: string) => {
    if (!base64String) return null;
    
    return (
      <img 
        src={base64String.startsWith('data:') ? base64String : `data:image/jpeg;base64,${base64String}`}
        alt="Moto"
        className="w-16 h-16 object-cover rounded-lg"
        onError={(e) => {
          e.currentTarget.src = '/placeholder-image.jpg';
          e.currentTarget.onerror = null;
        }}
      />
    );
  };