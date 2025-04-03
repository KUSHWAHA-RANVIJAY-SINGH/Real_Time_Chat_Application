import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Double-check directory exists before saving
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // Create a safe filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const safeFilename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        cb(null, safeFilename);
    }
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = {
        'image/jpeg': true,
        'image/png': true,
        'image/gif': true,
        'audio/mpeg': true,
        'audio/wav': true,
        'audio/ogg': true,
        'application/pdf': true,
        'application/msword': true,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
        'application/vnd.ms-excel': true,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': true
    };

    if (allowedTypes[file.mimetype]) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images, audio, and common document types are allowed.'), false);
    }
};

// Create multer upload instance with error handling
const multerUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Wrap multer upload in error handling middleware
export const upload = {
    single: (fieldName) => {
        return (req, res, next) => {
            multerUpload.single(fieldName)(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading
                    return res.status(400).json({
                        message: 'File upload error',
                        error: err.message
                    });
                } else if (err) {
                    // An unknown error occurred
                    return res.status(400).json({
                        message: 'Error uploading file',
                        error: err.message
                    });
                }
                // Everything went fine
                next();
            });
        };
    }
};

// Helper function to determine message type from file
export const getMessageType = (file) => {
    if (!file) return 'text';
    const mimeType = file.mimetype;
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'file';
}; 