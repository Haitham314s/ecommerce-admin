"use client";

import Info from "@/components/Info";
import Gallery from "@/components/gallery";
import Modal from "@/components/ui/Modal";
import usePreviewModal from "@/hooks/UsePreviewModal";

interface Props {}

function PreviewModal({}: Props) {
  const previewModal = usePreviewModal();
  const [isOpen, onClose, product] = usePreviewModal((state) => [
    state.isOpen,
    state.onClose,
    state.data,
  ]);

  if (!product) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:grid-cols-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>

        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
}

export default PreviewModal;
