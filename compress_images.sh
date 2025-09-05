#!/bin/bash

# Image compression script
# This script will compress PNG and JPG images to reduce file sizes

echo "Starting image compression..."

# Create backup directory
mkdir -p backup_original_images
mkdir -p backup_original_images/rw

# Function to compress PNG files
compress_png() {
    local file="$1"
    local quality="$2"
    echo "Compressing PNG: $file"
    
    # Backup original
    if [[ "$file" == *"/rw/"* ]]; then
        cp "$file" "backup_original_images/rw/$(basename "$file")"
    else
        cp "$file" "backup_original_images/$(basename "$file")"
    fi
    
    # Compress PNG - convert to high quality JPEG if very large, otherwise optimize PNG
    local filesize=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    if [ $filesize -gt 500000 ]; then
        # Convert large PNGs to high-quality JPEG
        magick "$file" -quality $quality -strip "${file%.png}.jpg"
        rm "$file"
        echo "  Converted to JPEG: ${file%.png}.jpg"
    else
        # Optimize PNG
        magick "$file" -strip -define png:compression-level=9 "$file"
        echo "  Optimized PNG: $file"
    fi
}

# Function to compress JPG files
compress_jpg() {
    local file="$1"
    local quality="$2"
    echo "Compressing JPG: $file"
    
    # Backup original
    if [[ "$file" == *"/rw/"* ]]; then
        cp "$file" "backup_original_images/rw/$(basename "$file")"
    else
        cp "$file" "backup_original_images/$(basename "$file")"
    fi
    
    # Compress JPG
    magick "$file" -quality $quality -strip "$file"
    echo "  Compressed: $file"
}

# Compress images in main directory
echo "Compressing images in main directory..."
shopt -s nullglob
for file in *.png *.jpg *.PNG *.jpeg *.JPEG; do
    if [ -f "$file" ]; then
        case "${file,,}" in
            *.png)
                compress_png "$file" 85
                ;;
            *.jpg|*.jpeg)
                compress_jpg "$file" 80
                ;;
        esac
    fi
done

# Compress images in rw directory
echo "Compressing images in rw/ directory..."
cd rw
for file in *.png *.jpg *.PNG *.jpeg *.JPEG; do
    if [ -f "$file" ]; then
        case "${file,,}" in
            *.png)
                compress_png "$file" 85
                ;;
            *.jpg|*.jpeg)
                compress_jpg "$file" 80
                ;;
        esac
    fi
done

cd ..

echo "Compression complete!"
echo "Original images have been backed up to 'backup_original_images/' directory"
echo "Checking new file sizes..."

# Show new file sizes
echo -e "\n=== NEW FILE SIZES ==="
shopt -s nullglob
files=(*.png *.jpg *.PNG *.jpeg *.JPEG)
if [ ${#files[@]} -gt 0 ]; then
    du -h "${files[@]}" | sort -hr
fi
echo -e "\n=== RW DIRECTORY ==="
rw_files=(rw/*.png rw/*.jpg rw/*.PNG rw/*.jpeg rw/*.JPEG)
if [ ${#rw_files[@]} -gt 0 ]; then
    du -h "${rw_files[@]}" | sort -hr
fi
