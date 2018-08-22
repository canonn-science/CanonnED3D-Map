# cp all Example .csvs.exp to an example file to actual CSVs
for f in *.csv.exp; do 
mv -- "$f" "${f%.csv.exp}.csv"
done
