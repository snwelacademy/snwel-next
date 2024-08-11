'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Link from "next/link";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddNew: () => void;
    loading: boolean;
}

export const AfterCourseCreatedModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onAddNew,
    loading,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="Choose Action"
            description="Select action after course creation."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Link href={`/admin/courses`} onClick={onClose}>
                    <Button variant={'link'}>Course List</Button>
                </Link>
                <Button disabled={loading} variant="destructive" onClick={onAddNew}>
                    Add New
                </Button>
            </div>
        </Modal>
    );
};
