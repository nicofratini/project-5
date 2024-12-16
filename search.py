import os

# Mot à rechercher
search_term = "formatCurrency"
# Dossier racine
root_dir = "src/"

for subdir, _, files in os.walk(root_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            file_path = os.path.join(subdir, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    for line_num, line in enumerate(lines, start=1):
                        if search_term in line:
                            print(f"{file_path}:{line_num}: {line.strip()}")
            except Exception as e:
                print(f"Erreur lors de la lecture du fichier {file_path}: {e}")
