#!/bin/bash

# Image compression script
# This script will compress PNG and JPG images to reduce file sizes

echo "Starting image compression..."

# Create backup directory
mkdir -p backup_original_images
mkdir -p backup_original_images/rw

echo "Compressing images in main directory..."

# Backup and compress PNG files in main directory
for file in *.png *.PNG; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        cp "$file" "backup_original_images/"
        
        # Check file size
        filesize=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
        if [ $filesize -gt 500000 ]; then
            # Convert large PNGs to JPEG
            magick "$file" -quality 85 -strip "${file%.*}.jpg"
            rm "$file"
            echo "  Converted large PNG to JPEG: ${file%.*}.jpg"
        else
            # Optimize smaller PNGs
            magick "$file" -strip -define png:compression-level=9 "$file"
            echo "  Optimized PNG: $file"
        fi
    fi
done

# Backup and compress JPG files in main directory
for file in *.jpg *.jpeg *.JPG *.JPEG; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        cp "$file" "backup_original_images/"
        magick "$file" -quality 80 -strip "$file"
        echo "  Compressed JPEG: $file"
    fi
done

echo "Compressing images in rw/ directory..."

# Backup and compress PNG files in rw directory
for file in rw/*.png rw/*.PNG; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        cp "$file" "backup_original_images/rw/"
        
        # Check file size
        filesize=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
        if [ $filesize -gt 500000 ]; then
            # Convert large PNGs to JPEG
            magick "$file" -quality 85 -strip "${file%.*}.jpg"
            rm "$file"
            echo "  Converted large PNG to JPEG: ${file%.*}.jpg"
        else
            # Optimize smaller PNGs
            magick "$file" -strip -define png:compression-level=9 "$file"
            echo "  Optimized PNG: $file"
        fi
    fi
done

# Backup and compress JPG files in rw directory
for file in rw/*.jpg rw/*.jpeg rw/*.JPG rw/*.JPEG; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        cp "$file" "backup_original_images/rw/"
        magick "$file" -quality 80 -strip "$file"
        echo "  Compressed JPEG: $file"
    fi
done

echo ""
echo "Compression complete!"
echo "Original images have been backed up to 'backup_original_images/' directory"
echo ""
echo "=== NEW FILE SIZES ==="
echo "Main directory:"
ls -la *.png *.jpg *.PNG *.JPG *.jpeg *.JPEG 2>/dev/null | awk '{print $5, $9}' | sort -nr
echo ""
echo "RW directory:"
ls -la rw/*.png rw/*.jpg rw/*.PNG rw/*.JPG rw/*.jpeg rw/*.JPEG 2>/dev/null | awk '{print $5, $9}' | sort -nr
