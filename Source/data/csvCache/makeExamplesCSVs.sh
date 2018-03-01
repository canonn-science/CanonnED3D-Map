# cp all Example .csvs.exp to an example file to actual CSVs
for f in *.csv.exp; do 
cp -- "$f" "${f%.csv.exp}.csv"
done
