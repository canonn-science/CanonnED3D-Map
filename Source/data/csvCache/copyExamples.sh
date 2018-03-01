# cp all .csvs to an example file to bypass .gitignore
for f in *.csv; do 
cp -- "$f" "${f%.csv}.csv.exp"
done
