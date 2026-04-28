import os
import re

def standardize_logo(directory):
    # Pattern for various footer/nav logo links
    # Matches <a ... class="...logo..." ...>SMK <span>C</span>AR</a>
    # We want to replace it with <a ... class="... logo" ...><img src="public/logo.png" class="brand-logo" alt="Logo">SMK <span>C</span>AR</a>
    
    pattern = re.compile(r'(<a\s+[^>]*class="([^"]*(?:footer-logo|z-logo|nav-logo)[^"]*)"[^>]*>)\s*(?:<img[^>]*>\s*)?SMK\s*<span>C</span>AR\s*</a>', re.IGNORECASE)
    
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.vite' in dirs:
            dirs.remove('.vite')
            
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Check if it contains SMK CAR but doesn't have the brand-logo img already
                def replacer(match):
                    full_open_tag = match.group(1)
                    classes = match.group(2)
                    
                    # If it already has logo class, don't add it again
                    new_classes = classes
                    if ' logo' not in classes and classes != 'logo':
                        new_classes = classes + ' logo'
                        
                    new_open_tag = full_open_tag.replace(f'class="{classes}"', f'class="{new_classes}"')
                    
                    return f'{new_open_tag}<img src="public/logo.png" class="brand-logo" alt="Logo">SMK <span>C</span>AR</a>'

                new_content = pattern.sub(replacer, content)
                
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated: {file}")

if __name__ == "__main__":
    standardize_logo('.')
    print("Logo standardization complete.")
